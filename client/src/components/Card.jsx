// /* eslint-disable react/prop-types */
// /* eslint-disable no-unused-vars */
// import React, { useState, useContext } from "react";
// import { Link, useLocation, useNavigate } from "react-router-dom";
// import Swal from "sweetalert2";
// import { AuthContext } from "../context/AuthProvider";
// import axios from "axios";

// const Card = ({ item }) => {
//   const { user, setReload } = useContext(AuthContext);
//   const { _id, name, image, price, description } = item;
  
//   const [isHeartFilled, setIsHeartFilled] = useState(false);

//   const handleHeartClick = () => {
//     setIsHeartFilled(!isHeartFilled);
//   };

//   const handleAddProduct = () => {
//     let cartItem = null
//     if (user && user.email) {
//       cartItem = {
//         product_id: _id,
//         name: name,
//         email: user.email,
//         price: price,
//         image: image,
//         quantity: 1,
//       };

//       console.log(cartItem);
//       axios
//         .post("http://localhost:5000/carts", cartItem)
//         .then((response) => {
//           setReload(true);
//           if (response.status === 201) {
//             Swal.fire({
//               title: "Product added on the cart",
//               position: "center",
//               icon: "success",
//               showConfirmButton: false,
//               timer: "1500",
//             });
//           }
//         })
//         .catch((error) => {
//           if (error.response) {
//             if (error.response.status === 404) {
//               Swal.fire({
//                 title: "Product not found!",
//                 position: "center",
//                 icon: "warning",
//                 showConfirmButton: false,
//                 timer: "1500",
//               });
//             } else if (error.response.status === 500) {
//               Swal.fire({
//                 title: "Some error Cart",
//                 position: "center",
//                 icon: "error",
//                 showConfirmButton: false,
//                 timer: "1500",
//               });
//             }
//           } 
//         });
//     }
//   };

//   return (
//     <div className="card shadow-xl relative mr-5 md:my-5 rounded-2xl">
//       <div
//         className={`rating gap-1 absolute right-2 top-2 p-4 heartStar bg-red-400 ${
//           isHeartFilled ? "text-rose-500" : "text-white"
//         }`}
//         onClick={handleHeartClick}
//       >
//         <svg
//           xmlns="http://www.w3.org/2000/svg"
//           viewBox="0 0 24 24"
//           fill="currentColor"
//           className="w-6 h-6 cursor-pointer"
//         >
//           <path d="m11.645 20.91-.007-.003-.022-.012a15.247 15.247 0 0 1-.383-.218 25.18 25.18 0 0 1-4.244-3.17C4.688 15.36 2.25 12.174 2.25 8.25 2.25 5.322 4.714 3 7.688 3A5.5 5.5 0 0 1 12 5.052 5.5 5.5 0 0 1 16.313 3c2.973 0 5.437 2.322 5.437 5.25 0 3.925-2.438 7.111-4.739 9.256a25.175 25.175 0 0 1-4.244 3.17 15.247 15.247 0 0 1-.383.219l-.022.012-.007.004-.003.001a.752.752 0 0 1-.704 0l-.003-.001Z" />
//         </svg>
//       </div>
//       <Link to={`/product/${_id}`}>
//         <figure>
//           <img
//             src={image}
//             alt=""
//             className="hover:scale-105 translate-all duration-300 md:h-72"
//           />
//         </figure>
//       </Link>
//       <div className="card-body">
//         <Link to={`/product/${_id}`}>
//           <h2 className="card-title">{name}</h2>
//         </Link>
//         <p>{description} </p>
//         <div className="card-actions justify-between items-center mt-2">
//           <h5 className="font-semibold">
//             {price} <span className="text-sm text-red">฿</span>
//           </h5>
//           <button
//             className="btn bg-red-500 text-white"
//             onClick={handleAddProduct}
//           >
//             Add to Cart
//           </button>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default Card;


import React, { useState, useContext } from "react";
import { Link } from "react-router-dom";
import Swal from "sweetalert2";
import { AuthContext } from "../context/AuthProvider";
import axios from "axios";

const Card = ({ item }) => {
  const { user , setReload } = useContext(AuthContext);
  const { _id, name, image, price, description } = item;
  const [isHeartFilled, setIsHeartFilled] = useState(false);

  const handleHeartClick = () => {
    setIsHeartFilled(!isHeartFilled);
  };
  const addToCart = async () => {
    console.log(item);
    console.log(_id);

    if (!user) {
      Swal.fire({
        icon: "info",
        title: "Please Login",
        showConfirmButton: false,
        timer: 1500,
      });
    } else {
      const cartObjects = {
        product_id: _id.toString(),
        email: user.email,
        price: price,
        name: user.displayName,
        image: image,
        quantity: 1,
      };

      console.log(cartObjects);
      try {
        const response = await axios.post(
          "http://localhost:5000/carts",
          cartObjects,
          {}
        );
        setReload(true);
        if (response.status === 200) {
          Swal.fire({
            icon: "success",
            title: "Your add item to cart",
            showConfirmButton: false,
            timer: 1500,
          });
          console.log("เพิ่มสินค้าลงในตะกร้าเรียบร้อย:", response.data);
        }
      } catch (error) {
        Swal.fire({
          icon: "info",
          title: "Error add carts",
          showConfirmButton: false,
          timer: 1500,
        });
      }
    }
  };
  return (
    <div className="card shadow-xl relative mr-5 md:my-5">
      <div
        className={`rating gap-1 absolute right-2 top-2 p-4 heartStar bg-red z-[1] ${
          isHeartFilled ? "text-rose-500" : "text-white"
        }`}
        onClick={handleHeartClick}
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 24 24"
          fill="currentColor"
          className="w-6 h-6 cursor-pointer"
        >
          <path d="m11.645 20.91-.007-.003-.022-.012a15.247 15.247 0 0 1-.383-.218 25.18 25.18 0 0 1-4.244-3.17C4.688 15.36 2.25 12.174 2.25 8.25 2.25 5.322 4.714 3 7.688 3A5.5 5.5 0 0 1 12 5.052 5.5 5.5 0 0 1 16.313 3c2.973 0 5.437 2.322 5.437 5.25 0 3.925-2.438 7.111-4.739 9.256a25.175 25.175 0 0 1-4.244 3.17 15.247 15.247 0 0 1-.383.219l-.022.012-.007.004-.003.001a.752.752 0 0 1-.704 0l-.003-.001Z" />
        </svg>
      </div>
      <Link>
        <figure>
          <img
            src={image}
            alt=""
            className="hover:scale-105 translate-all duration-300 md:h-72"
          />
        </figure>
      </Link>
      <div className="card-body">
        <Link>
          <h2 className="card-title">{name}</h2>
        </Link>
        <p>{description} </p>
        <div className="card-actions justify-between items-center mt-2">
          <h5 className="font-semibold">
            {price} <span className="text-sm text-red">฿</span>
          </h5>
          <button className="btn bg-red text-white" onClick={addToCart}>
            Add to Cart
          </button>
        </div>
      </div>
    </div>
  );
};

export default Card;
