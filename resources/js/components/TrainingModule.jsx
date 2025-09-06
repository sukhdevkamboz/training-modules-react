import React, { useState } from "react";
import axios from "axios";

export default function AddQuestion() {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [question, setQuestion] = useState("");
  const [selectedRadio, setSelectedRadio] = useState("");
  const [options, setOptions] = useState([{ text: "", is_correct: false }]);

  const addOption = () => {
    setOptions([...options, { text: "", is_correct: false }]);
  };

  const removeOption = (index) => {
    setOptions(options.filter((_, i) => i !== index));
  };

  const handleOptionChange = (index, field, value) => {
    const updatedOptions = [...options];
    updatedOptions[index][field] = value;
    setOptions(updatedOptions);
  };

  const submitForm = (e) => {
    e.preventDefault();

    const formData = {
      title,
      description,
      question,
      question_type: selectedRadio,
      options,
    };

    console.log("Form Submitted:", formData);

    axios
      .post("/api/training-modules", formData)
      .then((res) => {
        console.log(res.data);
        alert(res.data.message);
        window.location.reload();
      })
      .catch((err) => {
        console.error(err.response?.data || err.message);
      });
  };

  return (
    <div className="container">
      <div className="row justify-content-center">
        <div className="col-md-8">
          <div className="card">
            <div className="card-header">Add Question</div>
            <div className="card-body">
              <form onSubmit={submitForm}>
                {/* Module Name */}
                <div className="mb-3">
                  <label htmlFor="title" className="form-label">
                    Module Name:
                  </label>
                  <input
                    type="text"
                    id="title"
                    className="form-control"
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                    placeholder="Enter module name"
                    required
                  />
                </div>

                {/* Module Description */}
                <div className="mb-3">
                  <label htmlFor="description" className="form-label">
                    Module Description:
                  </label>
                  <textarea
                    id="description"
                    className="form-control"
                    rows="3"
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                    placeholder="Module description"
                    required
                  ></textarea>
                </div>

                {/* Question */}
                <div className="mb-3">
                  <label htmlFor="question" className="form-label">
                    Question:
                  </label>
                  <input
                    type="text"
                    id="question"
                    className="form-control"
                    value={question}
                    onChange={(e) => setQuestion(e.target.value)}
                    placeholder="Enter question"
                    required
                  />
                </div>

                {/* Radio Selection */}
                <div className="mb-3">
                  <label className="form-label d-block">Question Type:</label>
                  <div className="form-check">
                    <input
                      type="radio"
                      id="option1"
                      value="selection"
                      checked={selectedRadio === "selection"}
                      onChange={(e) => setSelectedRadio(e.target.value)}
                      className="form-check-input"
                    />
                    <label htmlFor="option1" className="form-check-label">
                      Selection
                    </label>
                  </div>
                  <div className="form-check">
                    <input
                      type="radio"
                      id="option2"
                      value="singleChoice"
                      checked={selectedRadio === "singleChoice"}
                      onChange={(e) => setSelectedRadio(e.target.value)}
                      className="form-check-input"
                    />
                    <label htmlFor="option2" className="form-check-label">
                      Single Choice
                    </label>
                  </div>
                </div>

                {/* Add Option Button */}
                <button
                  type="button"
                  onClick={addOption}
                  className="btn btn-primary mt-2"
                >
                  Add Option
                </button>

                <h3 className="mt-3">Options</h3>
                {options.map((option, index) => (
                  <div key={index} className="mb-2">
                    <input
                      type="text"
                      value={option.text}
                      onChange={(e) =>
                        handleOptionChange(index, "text", e.target.value)
                      }
                      placeholder="Option text"
                      className="form-control mb-1"
                    />
                    <label>
                      <input
                        type="checkbox"
                        checked={option.is_correct}
                        onChange={(e) =>
                          handleOptionChange(
                            index,
                            "is_correct",
                            e.target.checked
                          )
                        }
                      />{" "}
                      Correct
                    </label>
                    <button
                      type="button"
                      onClick={() => removeOption(index)}
                      className="btn btn-sm btn-danger ms-2"
                    >
                      Remove
                    </button>
                  </div>
                ))}

                {/* Submit */}
                <button type="submit" className="btn btn-primary w-100 mt-3">
                  Submit
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
