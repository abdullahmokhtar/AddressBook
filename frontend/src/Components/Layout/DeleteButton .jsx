import React from "react";
import Swal from "sweetalert2";

const DeleteButton = ({ onDelete, id, onSuccess }) => {
  const handleDelete = async () => {
    Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#d33",
      cancelButtonColor: "#3085d6",
      confirmButtonText: "Yes, delete it!",
    }).then(async (result) => {
      if (result.isConfirmed) {
        try {
          // Call the onDelete function to handle the delete logic
          await onDelete(id);
          Swal.fire("Deleted!", "Your item has been deleted.", "success");
          // Call the onSuccess function to refresh the data
          onSuccess();
        } catch (error) {
          // Show an error message using SweetAlert2 if the delete request fails
          Swal.fire(
            "Error!",
            error.response.data || "An error occurred",
            "error"
          );
        }
      }
    });
  };

  return (
    <button onClick={handleDelete} className="btn btn-danger">
      Delete
    </button>
  );
};

export default DeleteButton;
