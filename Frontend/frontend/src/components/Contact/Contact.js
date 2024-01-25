import { useFormik } from "formik";
import React, { Component, useRef, useState } from "react";
import emailjs from "@emailjs/browser";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import axios from "axios";
import styles from "./styles.module.css";
import { accountId } from "../../utils";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const Contact = () => {
  const [isOtherChecked, setIsOtherChecked] = useState(false);
  const [img, setImg] = useState("");
  const [image, setImage] = useState("");

  const handleUploadImage = async (e) => {
    const file = e.target.files[0];
    setImage(file);
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setImg(reader.result);
        formikContact.setFieldValue("image", reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleRadioChange = (e) => {
    const { name, value } = e.target;

    // If "other" option is selected, concatenate "other : " with the input value
    const updatedValue =
      name === "typeOfWaste" && value === "other"
        ? `other : ${formikContact.values.other}`
        : value;

    // Update the formik state with the concatenated or regular value
    formikContact.setValues({
      ...formikContact.values,
      [name]: updatedValue,
    });

    // If "other" option is selected, update isOtherChecked state
    setIsOtherChecked(name === "typeOfWaste" && value === "other");
  };

  const initData = {
    pre_heading: "Claim your NFT",
    heading:
      "Real world +impact. Take part in building a green future with us.",
    content:
      "Welcome to chatafisha market place for an NFT mint please fill out the form below don't forget to verify!",
  };

  async function generateUniqueID() {
    const timestamp = await new Date().getTime().toString(36);
    const randomString = await Math.random().toString(36).substr(2, 5);
    return await (timestamp + randomString).toUpperCase();
  }

  //   sgMail.setApiKey(
  //     "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"
  //   );
  const typesOfWaste = [
    "Polycarbonate (PC)",
    "Polyethylene (PE)",
    "Polypropylene (PP)",
    "Polyethylene Terephthalate (PETE or PET)",
    "Polyvinyl Chloride (PVC)",
    "Acrylonitrile-Butadiene-Styrene (ABS)",
  ];

  const sendEmail = async (formElement) => {
    const serviceId = "service_f3uj7rh"; // Your EmailJS service ID
    const templateId = "template_8ktfs7k"; // Your EmailJS template ID
    const userId = "DUtTwel3hKZrkWvOX"; // Your EmailJS user ID

    // Create an HTML form element
    const form = document.createElement("form");
    form.style.display = "none"; // Hide the form

    // Append fields to the form
    for (const key in formElement) {
      if (formElement.hasOwnProperty(key)) {
        const input = document.createElement("input");
        input.name = key;
        input.value = formElement[key];
        form.appendChild(input);
      }
    }

    // Append the form to the body
    document.body.appendChild(form);

    emailjs.sendForm(serviceId, templateId, form, userId).then(
      (response) => {
        console.log("Email sent successfully:", response);
      },
      (error) => {
        console.error("Email sending failed:", error);
      }
    );
  };

  const formikContact = useFormik({
    initialValues: {
      image: "",
      name: "",
      email: "",
      description: "",
      typeOfWaste: "",
      other: "",
      kgs: "",
      code: "",
      date: "",
    },
    onSubmit: async (values, actions) => {
      console.log(values);
      const code = await generateUniqueID();
      console.log("code : " + code);

      const nftData = new FormData();
      nftData.append("code", code);
      nftData.append("image", image);
      nftData.append("name", values.name);
      nftData.append("email", values.email);
      nftData.append("accountid", accountId().accountId);
      nftData.append("description", values.description);
      nftData.append(
        "typeofwaste",
        values.typeOfWaste == "other : "
          ? `other : ${formikContact.values.other}`
          : values.typeOfWaste
      );
      nftData.append("kgs", values.kgs + "");
      nftData.append("date", new Date().toString());
      nftData.append("status", "pending");

      const formData = {
        code: code,
        image: image,
        name: values.name,
        email: values.email,
        accountid: accountId().accountId,
        description: values.description,
        typeofwaste:
          values.typeOfWaste == "other : "
            ? `other : ${formikContact.values.other}`
            : values.typeOfWaste,
        kgs: values.kgs + "",
        date: new Date().toString(),
        status: "pending",
      };

      await sendEmail(formData);

      try {
        await axios
          .post(
            "https://marketplace.chatafisha.com:5000/nfts/create",
            nftData,
            {
              headers: {
                "Content-Type": "multipart/form-data",
              },
            }
          )
          .then((res) => {
            console.log(res.data);
            toast.success("Data submitted successfully!");
          })
          .catch((err) => {
            console.log(err);
            toast.error("Data submission failed!");
          });
      } catch (err) {
        console.log(err);
        toast.error("An error occurred!");
      }

      actions.resetForm();
      // window.location = "/claim-nft";
    },
  });
  const form = useRef();
  return (
    <section className="author-area">
      <ToastContainer position="top-right" />
      <div className="container">
        <div className="row justify-content-center">
          <div className="col-12 col-md-8 col-lg-12">
            {/* Intro */}
            <div className="intro text-center">
              <span>{initData.pre_heading}</span>
              <h3 className="mt-3 mb-0">{initData.heading}</h3>
              <p>{initData.content}</p>
            </div>
            {/* Item Form */}
            <form
              id="contact-form"
              className="item-form card no-hover"
              onSubmit={formikContact.handleSubmit}
              ref={form}
            >
              <div className="container">
                <div className="row">
                  <div className="col-md-3">
                    <div className="form-group mt-3">
                      <label>Image</label>
                      <div className={styles.fileInputContainer}>
                        <input
                          type="file"
                          accept="image/*"
                          onChange={handleUploadImage}
                          className={styles.fileInput}
                        />
                        {img && (
                          <img
                            src={img}
                            alt="Uploaded"
                            className={styles.uploadedImage}
                          />
                        )}
                      </div>
                    </div>
                    <div className="form-group mt-3">
                      <label>Name</label>
                      <input
                        type="text"
                        className="form-control"
                        name="name"
                        placeholder="Name"
                        required
                        onChange={formikContact.handleChange}
                        onBlur={formikContact.handleBlur}
                        value={formikContact.values.name}
                      />
                    </div>
                    <div className="form-group mt-3">
                      <label>Email</label>
                      <input
                        type="email"
                        className="form-control"
                        name="email"
                        placeholder="Email"
                        required
                        onChange={formikContact.handleChange}
                        onBlur={formikContact.handleBlur}
                        value={formikContact.values.email}
                      />
                    </div>
                  </div>
                  <div className="col-md-3">
                    <div className="form-group mt-3">
                      <label>Description</label>
                      <textarea
                        className="form-control"
                        id="description"
                        name="description"
                        placeholder="Write a short description about your waste-offset"
                        required
                        cols={30}
                        rows={8}
                        onChange={formikContact.handleChange}
                        onBlur={formikContact.handleBlur}
                        value={formikContact.values.description}
                      />
                    </div>
                  </div>
                  <div className="col-md-6">
                    <div className="card types">
                      <label>Type of waste accounted for</label>

                      <div className="form-group mt-3">
                        {typesOfWaste.map((item, index) => (
                          <div
                            className="form-check form-check-inline"
                            key={index}
                          >
                            <input
                              className="form-check-input"
                              type="radio"
                              name="typeOfWaste"
                              id={item}
                              value={item}
                              onChange={handleRadioChange}
                              checked={
                                formikContact.values.typeOfWaste === item
                              }
                              onBlur={formikContact.handleBlur}
                            />
                            <label
                              className="form-check-label"
                              style={{ fontSize: "14px" }}
                              htmlFor={item}
                            >
                              {item}
                            </label>
                          </div>
                        ))}
                        <div className="form-check form-check-inline">
                          <input
                            className="form-check-input"
                            type="radio"
                            name="typeOfWaste"
                            id="otherOption"
                            value="other"
                            onChange={handleRadioChange}
                            checked={isOtherChecked}
                            onBlur={formikContact.handleBlur}
                          />
                          <label
                            className="form-check-label"
                            style={{ fontSize: "14px" }}
                            htmlFor="otherOption"
                          >
                            Other
                          </label>
                          {isOtherChecked && (
                            <input
                              type="text"
                              className="form-control ml-2"
                              name="other"
                              placeholder="Other..."
                              onChange={formikContact.handleChange}
                              onBlur={formikContact.handleBlur}
                              value={formikContact.values.other}
                            />
                          )}
                        </div>
                      </div>
                    </div>
                    <div className="d-flex flex-column flex-md-row mt-3">
                      <div className="flex-grow-1 mr-md-3 mb-3 mb-md-0">
                        <div className="form-group mt-3">
                          <label>Amount of waste off-set in Kilograms</label>
                          <div className="input-group">
                            <input
                              type="number"
                              className="form-control"
                              name="kgs"
                              placeholder="kg |"
                              onChange={formikContact.handleChange}
                              onBlur={formikContact.handleBlur}
                              value={formikContact.values.kgs}
                              style={{ marginRight: "5px" }} // Add margin to the right of the input
                            />
                            <div className="input-group-append ">
                              <button
                                className="btn btn-primary "
                                type="submit"
                                style={{ borderRadius: "8px" }}
                              >
                                <i className="icon-paper-plane mr-2" />
                                Submit
                              </button>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Contact;
