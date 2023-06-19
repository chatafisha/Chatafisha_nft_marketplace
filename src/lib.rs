use near_contract_standards::non_fungible_token::metadata::TokenMetadata;
use near_contract_standards::non_fungible_token::{Token, TokenId};
use near_sdk::borsh::{self, BorshDeserialize, BorshSerialize};
use near_sdk::serde::{Deserialize, Serialize};
use near_sdk::{env, near_bindgen, AccountId, Gas};
use near_sdk::{ext_contract, Promise, PromiseError};
use std::collections::HashMap;
use std::convert::TryInto;

pub const TGAS: u64 = 1_000_000_000_000;

#[ext_contract(ext_nft)]
pub trait NFTContract {
    fn nft_mint(
        &mut self,
        token_id: TokenId,
        receiver_id: AccountId,
        token_metadata: TokenMetadata,
    ) -> Token;

    fn nft_transfer(&mut self, receiver_id: AccountId, token_id: TokenId);
}

// Define the contract structure
#[near_bindgen]
#[derive(BorshDeserialize, BorshSerialize, Serialize, Deserialize)]
#[serde(crate = "near_sdk::serde")]
pub struct Minter {
    pub marketplacedata: HashMap<String, Vec<String>>,
}

// Define the default, which automatically initializes the contract
impl Default for Minter {
    fn default() -> Self {
        panic!("Minter contract is not initialized yet")
    }
}

// Implement the contract structure
// To be implemented in the front end
#[near_bindgen]
impl Minter {
    #[init]
    pub fn new() -> Self {
        assert!(env::state_read::<Self>().is_none(), "Already initialized");
        Self {
            marketplacedata: HashMap::new(),
        }
    }

    pub fn delete(&mut self) {
        assert!(
            env::signer_account_id() == env::current_account_id(),
            "This function is private"
        );
        self.marketplacedata.clear();
    }

    pub fn delete_key(&mut self, k: String) {
        assert!(
            env::signer_account_id() == env::current_account_id(),
            "This function is private"
        );
        self.marketplacedata.remove(&k);
    }



    pub fn add_new_meetup_collection(&mut self, meetup_ref: String) {
        assert!(
            env::signer_account_id() == env::current_account_id(),
            "This function is private"
        );
        self.marketplacedata.insert(meetup_ref, Vec::new());
    }

    pub fn mint_nft(
        &mut self,
        meetup_ref: String,
        token_id: TokenId,
        token_metadata: TokenMetadata,
        receiver_id: AccountId,
    ) -> Promise {
        assert!(env::current_account_id() == env::signer_account_id(), "This function is private");
        let vec = self
            .marketplacedata
            .get(&meetup_ref.clone())
            .unwrap()
            .clone();
        let nft_contract = "chatafisha_nft.testnet".to_string().try_into().unwrap();
        // Create a promise to call nft_mint
        let promise = ext_nft::ext(nft_contract)
            .with_attached_deposit(11000000000000000000000)
            .with_static_gas(Gas(3 * TGAS))
            .nft_mint(token_id.clone(), receiver_id, token_metadata);

        return promise.then(
            // Create a promise to callback unstaking_callback
            Self::ext(env::current_account_id())
                .with_static_gas(Gas(3 * TGAS))
                .mint_callback(meetup_ref.clone(), vec.clone()),
        );
    }

    #[private] // Public - but only callable by env::current_account_id()
    pub fn mint_callback(
        &mut self,
        #[callback_result] call_result: Result<Token, PromiseError>,
        meetup_ref: String,
        vec: Vec<String>,
    ) {
        // Check if the promise succeeded
        if call_result.is_err() {
            panic!("There was an error contacting the NFT contract");
        }

        let mut new_vec = vec;
        new_vec.push(env::signer_account_id().to_string());
        self.marketplacedata.insert(meetup_ref, new_vec);
    }

    pub fn get_marketplacedata(&self) -> HashMap<String, Vec<String>> {
        self.marketplacedata.clone()
    }

    pub fn get_special_data(&self, meetup_ref: String) -> Vec<String> {
        self.marketplacedata.get(&meetup_ref).unwrap().clone()
    }
}
