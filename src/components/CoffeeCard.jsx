import React from "react";
import { Link } from "react-router-dom";
import Swal from "sweetalert2";

const CoffeeCard = ({ coffee,coffees,setCoffees }) => {
  const { _id, name, quantity, supplier, taste, category, details, photo } =coffee;
    

  const handleDelete = (_id) => {
    console.log(_id);

    Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!",
    }).then((result) => {
      if (result.isConfirmed) {
    fetch(`http://localhost:5000/coffee/${_id}`,{
            method:'DELETE'
        })
          .then((res) => res.json())
          .then((data) => {
            console.log(data);
            if (data.deletedCount > 0) {
                Swal.fire({
                  title: "Deleted!",
                  text: "Your Coffee has been deleted.",
                  icon: "success"
                })
                const remaining = coffees.filter(cof => cof._id !== _id);
                 setCoffees(remaining);
            }
          });
      }
    });
  };

  return (
    <div className="card card-side bg-base-100 shadow-xl">
      <figure>
        <img src={photo} alt="Movie" />
      </figure>
      <div className="card-body">
        <h2 className="card-title">Name: {name}</h2>
        <p>{quantity}</p>
        <p>{supplier}</p>
        <p>{taste}</p>

        <div className="card-actions justify-end ">
          <button className="btn btn-error bg-orange-600">View</button>
          <Link to={`updateCoffee/${_id}`}>
          <button className="btn btn-error bg-orange-200">Edit</button>
          </Link>
          <button
            onClick={() => handleDelete(_id)}
            className="btn btn-error bg-orange-500"
          >
            x
          </button>
        </div>
      </div>
    </div>

  );
};

export default CoffeeCard;
