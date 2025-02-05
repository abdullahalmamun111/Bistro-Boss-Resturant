import React from 'react';
import SectionTitle from '../Components/SectionTitle';
import { useLoaderData } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import useAxiosSecure from '../hooks/useAxiosSecure';
import Swal from 'sweetalert2';
import usePublic from '../hooks/usePublic';

const image_hosting_key = import.meta.env.VITE_IMAGE_HOSTING_KEY;
const image_hosting_api = `https://api.imgbb.com/1/upload?key=${image_hosting_key}`

const UpdateItem = () => {
    const  {name,category,recipe,price,_id} = useLoaderData();
    
    const { register, handleSubmit ,reset} = useForm();
    const axiosPublic = usePublic();
    const axiosSecure = useAxiosSecure();
    
    const onSubmit = async(data) => {
      console.log(data);
      const imageFile = {image: data.image[0]}
      const res = await axiosPublic.post(image_hosting_api,imageFile,{
        headers: {
          'content-type': 'multipart/form-data'
        }
      })
      if(res.data.success){
        const menuItem = {
          name: data.name,
          category:data.category,
          price: parseFloat(data.price),
          recipe:data.recipe,
          image: res.data.data.display_url
        }
  
        const menuRes = await axiosSecure.patch(`/menu/${_id}`, menuItem);
        console.log(menuRes.data)
        if(menuRes.data.modifiedCount > 0){
          reset()
          Swal.fire({
            title: "Done!",
            text: `${data.name} Updated Successfully!`,
            icon: "success"
          });
        }
  
      }
    };

    return (
        <div>
            <SectionTitle
          subtitle={"Refresh Info!"}
          title={"UPDATE AN ITEM"}
        ></SectionTitle>

        <div>
                <form onSubmit={handleSubmit(onSubmit)}>
                  <label className="form-control w-full">
                    <div className="label">
                      <span className="label-text">Recipie Name* </span>
                    </div>
                    <input
                      defaultValue={name}
                      {...register("name", {required:true})}
                      type="text"
                      placeholder="Recipie Name"
                      className="input input-bordered w-full"
                    />
                  </label>
        
                  <div className="flex gap-6">
                    {/* category */}
                    <label className="form-control w-full ">
                      <div className="label">
                        <span className="label-text">Category* </span>
                      </div>
                      <select
                      defaultValue={category}
                        {...register("category", {required:true})}
                        className="select select-bordered w-full"
                      >
                        <option selected disabled>
                          Select A Category
                        </option>
                        <option value="Salad">Salad</option>
                        <option value="Pizza">Pizza</option>
                        <option value="Soup">Soup</option>
                        <option value="Desert">Desert</option>
                        <option value="Drinks">Drinks</option>
                      </select>
                    </label>
        
                    {/* price */}
        
                    <label className="form-control w-full ">
                      <div className="label">
                        <span className="label-text">Price* </span>
                      </div>
                      <input
                      defaultValue={price}
                        {...register("price", {required:true})}
                        type="number"
                        placeholder="Price"
                        className="input input-bordered w-full"
                      />
                    </label>
                  </div>
                  {/* text area */}
                  <label className="form-control mt-4">
                    <textarea
                    defaultValue={recipe}
                      {...register("recipe", {required:true})}
                      className="textarea textarea-bordered h-28"
                      placeholder="Recipe Details*"
                    ></textarea>
                  </label>
        
                  {/* choose file */}
                  <div className="form-control w-full mt-4">
                  <input {...register("image", {required:true})} type="file" className="file-input file-input-bordered w-full max-w-xs" />
                  </div>
        
                  {/* button */}
                  <button className="btn btn-primary mt-2">
                    Update Item
                  </button>
                </form>
              </div>
        </div>
    );
};

export default UpdateItem;