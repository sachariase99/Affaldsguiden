import { useState } from "react";
import useContainer from "../hooks/useContainer";
import { useSupabase } from "../supabase/supabaseClient";

const OrderContainer = () => {
  const { supabase } = useSupabase();
  const { containers, loading, error } = useContainer(true);
  const [selectedContainerId, setSelectedContainerId] = useState(null);
  const [formData, setFormData] = useState({
    fullname: '',
    address: '',
    zipcode: '',
    city: '',
    email: '',
    phone: '',
  });
  const [formStatus, setFormStatus] = useState('');
  const [errors, setErrors] = useState({}); // State for tracking errors

  if (loading)
    return (
      <p className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-3xl">
        Loading...
      </p>
    );
  if (error) return <p>Error: {error.message}</p>;

  const handleClick = (id) => {
    setSelectedContainerId(id === selectedContainerId ? null : id);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });

    // Clear specific field error when user changes the value
    setErrors({ ...errors, [name]: '' });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    let hasErrors = false;
    let validationErrors = {};

    // Client-side validation
    if (!selectedContainerId) {
      setFormStatus('Please select a container.');
      return;
    }

    // Check for required fields
    for (const [key, value] of Object.entries(formData)) {
      if (!value.trim()) {
        validationErrors[key] = `Please fill in the ${key}.`;
        hasErrors = true;
      }
    }

    // Numeric validation for zipcode and phone
    const numericFields = {
      zipcode: 'Postnummer',
      phone: 'Telefonnummer'
    };
    
    for (const [key, fieldName] of Object.entries(numericFields)) {
      if (isNaN(formData[key]) || formData[key].trim() === '') {
        validationErrors[key] = `Letters aren't accepted. Please type numbers for ${fieldName}.`;
        hasErrors = true;
      }
    }

    if (hasErrors) {
      setErrors(validationErrors);
      setFormStatus('Please fix the errors in the form.');
      return;
    }

    try {
      const { error } = await supabase
        .from('orders')
        .insert([
          {
            container_id: selectedContainerId,
            ...formData,
          },
        ]);

      if (error) {
        // Customize this part based on Supabase error details
        if (error.message.includes('invalid input syntax for type bigint')) {
          setFormStatus('There was an issue with the container ID. Please try again.');
        } else if (error.message.includes('not-null constraint')) {
          setFormStatus('Some required fields are missing. Please check your input.');
        } else {
          setFormStatus(`Error: ${error.message}`);
        }
        throw error; // Ensure errors are caught
      }

      setFormStatus('Order placed successfully!');
      // Optionally reset form fields
      setFormData({
        fullname: '',
        address: '',
        zipcode: '',
        city: '',
        email: '',
        phone: '',
      });
      setSelectedContainerId(null);
      setErrors({}); // Clear errors on successful submission
    } catch (error) {
      // Catch and display unexpected errors
      setFormStatus(`Unexpected error: ${error.message}`);
    }
  };

  return (
    <section
      className="h-full w-full bg-white shadow mb-32 pb-4 px-8"
      style={{
        backgroundImage: "linear-gradient(to bottom, #D8EADB 40%, #FFFFFF 50%)",
      }}
    >
      <h2 className="text-4xl pt-16 pb-8 font-bold">Bestil affaldscontainer</h2>
      <h3 className="text-2xl pb-8 font-semibold text-[#119B1E]">
        Hvis i mangler en affaldscontainer i din husstand kan du bestille en ved
        at udfylde og sende formularen herunder.
      </h3>
      <p className="pb-4">Vælg en af følgende container typer:</p>
      {containers.length > 0 ? (
        <div className="flex gap-4 flex-wrap">
          {containers.map((container) => (
            <div
              key={container.id}
              onClick={() => handleClick(container.id)}
              className={`p-4 rounded-md shadow-md w-36 h-36 flex flex-col justify-between items-center cursor-pointer hover:bg-[#D8EADB] border ${
                container.id === selectedContainerId
                  ? "bg-[#677D6A]"
                  : "bg-white"
              }`}
            >
              <h3 className="text-md font-semibold">{container.name}</h3>
              <div
                className="mb-4"
                dangerouslySetInnerHTML={{ __html: container.icon_svg }}
              />
            </div>
          ))}
        </div>
      ) : (
        <p>No containers available.</p>
      )}
      <p className="py-8">Containeren leveres til:</p>
      <form onSubmit={handleSubmit} className="flex flex-col gap-4">
        <input
          className={`px-6 py-3 rounded-lg border border-gray-300 w-2/5 ${errors.fullname ? 'border-red-500' : ''}`}
          type="text"
          name="fullname"
          value={formData.fullname}
          onChange={handleChange}
          required
          placeholder="Indtast dit navn"
        />
        <input
          className={`px-6 py-3 rounded-lg border border-gray-300 w-2/5 ${errors.address ? 'border-red-500' : ''}`}
          type="text"
          name="address"
          value={formData.address}
          onChange={handleChange}
          required
          placeholder="Indtast din adresse"
        />
        <input
          className={`px-6 py-3 rounded-lg border border-gray-300 w-2/5 ${errors.zipcode ? 'border-red-500' : ''}`}
          type="text"
          name="zipcode"
          value={formData.zipcode}
          onChange={handleChange}
          required
          placeholder="Indtast dit postnummer"
        />
        <input
          className={`px-6 py-3 rounded-lg border border-gray-300 w-2/5 ${errors.city ? 'border-red-500' : ''}`}
          type="text"
          name="city"
          value={formData.city}
          onChange={handleChange}
          required
          placeholder="Indtast navn på din by"
        />
        <input
          className={`px-6 py-3 rounded-lg border border-gray-300 w-2/5 ${errors.email ? 'border-red-500' : ''}`}
          type="email"
          name="email"
          value={formData.email}
          onChange={handleChange}
          required
          placeholder="Indtast din email"
        />
        <input
          className={`px-6 py-3 rounded-lg border border-gray-300 w-2/5 ${errors.phone ? 'border-red-500' : ''}`}
          type="tel"
          name="phone"
          value={formData.phone}
          onChange={handleChange}
          required
          placeholder="Indtast dit telefonnummer"
        />
        <input
          type="submit"
          value="Send"
          className="bg-[#119B1E] hover:bg-[#1A3636] text-white w-2/12 py-3 rounded-lg cursor-pointer"
        />
        {formStatus && <p className="text-center mt-4">{formStatus}</p>}
      </form>
    </section>
  );
};

export default OrderContainer;
