/* eslint-disable no-unused-vars */
import React, { useState, useEffect } from 'react';
import Card from '../../components/Card';
import axios from "axios";


const ProductList = () => {
  const [products, setProducts] = useState([]);
  const [filteredItems, setFilteredItems] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [sortOption, setSortOption] = useState("default");
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(8);
  const [categories, setCategories] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
       
        const Product = await axios.get("http://localhost:5000/products")
        const data = await Product.data;
        setProducts(data);
        setFilteredItems(data);
        setCategories(["all", ...new Set(data.map((item) => item.category))]);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, []);

  const filterItems = (category) => {
    const filtered = category === "all"
      ? products
      : products.filter((item) => item.category === category);
    setFilteredItems(filtered);
    handleSortChange(sortOption, filtered);
    setSelectedCategory(category);
    setCurrentPage(1);
  };

  const handleSortChange = (option, products) => {
    setSortOption(option);
    let sortedItems = [...products];
    switch (option) {
      case "A-Z":
        sortedItems.sort((a, b) => a.name.localeCompare(b.name));
        break;
      case "Z-A":
        sortedItems.sort((a, b) => b.name.localeCompare(a.name));
        break;
      case "low-to-high":
        sortedItems.sort((a, b) => a.price - b.price);
        break;
      case "high-to-low":
        sortedItems.sort((a, b) => b.price - a.price);
        break;
      default:
        break;
    }
    setFilteredItems(sortedItems);
    setCurrentPage(1);
  };

  const paginate = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = filteredItems.slice(indexOfFirstItem, indexOfLastItem);

  return (
    <div>
      {/** Product List Banner */}
      <div className="section-container bg-gradient-to-r from-[#FAFAFA] from-0% to-[#FCFCFC] to-100%">
        <div className='py-48 flex flex-col justify-center items-center'>
          <div className='text-center space-y-7 px-4'>
            <h2 className='md:text-4xl text-4xl font-bold md:leading-snug leading-snug'>
              Unleash Your Inner<span className='text-red'> Geek</span> : <br /> {" "}
              Shop Our Exclusive Tech-themed Merchandises!
            </h2>
            <p className='text-xl text-[#4A4A4A]'>
              Our mission: To merge fashion with functionality in the world of Software Engineering. Lorem ipsum dolor sit amet,
              consectetur adipiscing elit. Sed in elementum justo. Sed id aliquet nibh. Donec pellentesque ac orci nec rhoncus.
              Ut mollis diam sit amet purus ultrices fringilla. Aliquam euismod tempus ante interdum facilisis.
              Class aptent taciti sociosqu ad litora torquent per conubia nostra, per inceptos himenaeos. Cras in eros malesuada,
              dapibus tellus vel, feugiat urna. Nunc nulla elit, vulputate id pretium at, dignissim at nisl.
            </p>
            <button className='btn bg-red px-8 py-3 font-semibold text-white rounded-full'>
              Order Now
            </button>
          </div>
        </div>
      </div>

      {/** Product List Filter */}
      <div className='section-container'>
        <div className='flex flex-col md:flex-row flex-wrap md:justify-between'>
          {/** Filter  */}
          <div className='flex flex-row justify-start md:items-center md:gap-8 gap-4 flex-wrap'>
            {categories.map((category, index) => (
              <button
                key={index}
                className={`${selectedCategory === category ? "active" : ""} px-4 py-2 rounded-full`}
                onClick={() => filterItems(category)}
              >
                <p className='capitalize'>{category}</p>
              </button>
            ))}
          </div>
          {/** Sort Option */}
          <div className='flex justify-end mb-4 rounded-sm'>
            <div className='bg-black p-2'>
              <select
                id="sort"
                className='bg-black text-white px-2 rounded-sm'
                onChange={(e) => handleSortChange(e.target.value, filteredItems)}
                value={sortOption}
              >
                <option value={"default"}>Default</option>
                <option value={"A-Z"}>A-Z</option>
                <option value={"Z-A"}>Z-A</option>
                <option value={"low-to-high"}>Low to high</option>
                <option value={"high-to-low"}>High to low</option>
              </select>
            </div>
          </div>
          {/** Product Cards */}
          <div className='grid md:grid-cols-4 sm:grid-cols-2 grid-cols-1 gap-4'>
            {currentItems.map((item, index) => (
              <Card key={index} item={item} />
            ))}
          </div>
          {/** Pagination */}
          <div className='flex justify-center mt-4'>
            {Array.from({ length: Math.ceil(filteredItems.length / itemsPerPage), }).map((_, i) => {
              return (
                <button
                  key={i}
                  className={`mx-2 px-4 py-2 rounded-full ${currentPage === i + 1 ? "bg-black text-white" : "bg-gray-200"}`}
                  onClick={() => paginate(i + 1)}
                >
                  {i + 1}
                </button>
              )
            })}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductList;
