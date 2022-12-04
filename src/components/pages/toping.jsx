import React from "react"
import Header from "../moduls/header"
import clip from "../../assets/clip.svg"
import { useState } from 'react';
import { API } from '../config/api';
import { useNavigate } from 'react-router';
import { useMutation } from 'react-query';

export function AddToping() {
  const navigate = useNavigate();
  const [popUp, setPopUp] = useState(false);
  const [photoToping, setPhotoToping] = useState(<p>Photo Toping</p>)
  const [preview, setPreview] = useState(null); //For image preview
  // Create variabel for store data with useState here ...
  const [form, setForm] = useState({
    title: '',
    price: '',
    image: '',
  }); 

  // Handle change data on form
  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]:
        e.target.type === 'file' ? e.target.files : e.target.value,
    });

    // Create image url for preview
    if (e.target.type === 'file') {
      let url = URL.createObjectURL(e.target.files[0]);
      setPreview(url);
      setPhotoToping(
        <p className="txt-black">{url}</p>
      )
    }
  };

  // Create function for handle insert product data with useMutation here ...
  const handleSubmit = useMutation(async (e) => {
    try {
      e.preventDefault();

      // Configuration
      const config = {
        headers: {
          'Content-type': 'multipart/form-data',
        },
      };

      // Store data with FormData as object
      const formData = new FormData();
      formData.set('title', form.title);
      formData.set('price', form.price);
      formData.set('image', form.image[0], form.image[0].name);

      // Insert product data
      const response = await API.post('/topping', formData, config);
      console.log(response);

      navigate('/add-toping');
    } catch (error) {
      console.log(error);
    }
  });

  return (
    <>
    <Header />
    <main className="after-nav">
        <section className="pt3 flex jc-between ai-start">
            <form className="w100 flex-col mx5"
            onSubmit={ (e) => handleSubmit.mutate(e) }
            >
                <h2 className="mb3 txt-red fw700">Toping</h2>
                <input className="modal-input mb1-5 br-red br5"
                 type="text"
                 id="title" name="title"
                 placeholder="Name Toping"
                 onChange={ handleChange }
                 required
                />
                <input className="modal-input mb1-5 br-red br5"
                 type="number"
                 id="price" name="price"
                 placeholder="Price"
                 onChange={ handleChange }
                 required
                />
                <input
                 type="file"
                 name="image" id="photo-toping"
                 hidden
                 onChange={ handleChange }
                 required
                />

                <label className="input mb4 flex jc-between ai-center" htmlFor="photo-toping">
                  {photoToping}
                  <img src={clip} alt="clip" />
                </label>
                <div className="flex jc-center">
                  <button className="input-button bg-red br-none br5 txt-white fw500" onClick={()=>setPopUp(true)}>Add Toping</button>
                </div>
            </form>
            { preview && (
            <img className="input-toping" src={preview} alt={preview} />
            )}
             {popUp && 
      <section className="modal fixed z-index-3 w100 h100 flex jc-center ai-center"
      onClick={ () => setPopUp(false) }
      >
    <div className="notification-background">
      <h5>Topping Has Been Added Successfully</h5>
    </div>
      </section>
    }
        </section>
    </main>
    </>
  )
}

