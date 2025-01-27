import React, { useState } from "react";

const PopupForm = ({ onEdit, id, onSuccess }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    await onEdit(id, { ...formData, id });
    setIsOpen(false);
    await onSuccess();
  };

  return (
    <div className="d-inline-block me-3">
      <button onClick={() => setIsOpen(true)} className="btn btn-success mb-2">
        Edit
      </button>

      {isOpen && (
        <div
          className="text-start position-fixed top-0 start-0 w-100 h-100 bg-dark bg-opacity-50 d-flex align-items-center justify-content-center"
          style={{ zIndex: 1050 }}
        >
          <div className="bg-white col-4 rounded p-4 shadow-lg">
            <form onSubmit={handleSubmit}>
              <div className="mb-3">
                <label htmlFor="name" className="form-label">
                  Name
                </label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  value={formData.name}
                  onChange={handleInputChange}
                  className="form-control"
                  required
                />
              </div>
              <div className="d-flex justify-content-end">
                <button
                  type="button"
                  onClick={() => setIsOpen(false)}
                  className="btn btn-secondary me-2"
                >
                  Cancel
                </button>
                <button type="submit" className="btn btn-primary">
                  Submit
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default PopupForm;
