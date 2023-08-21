import { useState } from 'react'

const FormMailer = () => {
  const [formData, setFormData] = useState({
    firstname: '',
    lastname: '',
    email: '',
    phone: ''
  });

  const [attachment, setAttachment] = useState(null);

  const handleFileChange = (event) => {
    const file = event.target.files[0];
    setAttachment(file);
  };

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const sendEmailWithAttachment = (attachmentData) => {
      Email.send({
          SecureToken: "c9cc92a3-3312-45b7-a9a8-33a2222aecc4",
          Host : "smtp.elasticemail.com",
          Username : "lazarochloekim@gmail.com",
          Password : "B39675D5FA39092B29E5AF1CF52B4E7E1D07",
          To : 'chloe.lazaro@aretex.com.au',//Change based on who will received the email.
          From : formData.email,
          Subject : "Application Form",
          Body : `First Name: ${formData.firstname} 
                  Last Name: ${formData.lastname}
                  Phone: ${formData.phone}
                  Email: ${formData.email}`,
          Attachments: [
              {
                  name: attachment.name,
                  data: attachmentData  // Use the base64-encoded attachment data
              }
          ]
      }).then(
          message => alert(message)
      );
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    
    if (attachment) {
        console.log(attachment);
        
        // Read the file and convert it to a base64-encoded string
        const reader = new FileReader();
        reader.onload = function(event) {
            const attachmentData = event.target.result.split(',')[1]; // Extract the base64 data
            sendEmailWithAttachment(attachmentData);
        };
        reader.readAsDataURL(attachment);
    }
  };
  return (
    <>
       <form onSubmit={handleSubmit}>
         <input type="text" name="firstname" placeholder="First Name" value={formData.firstname} onChange={handleInputChange}/>
         <input type="text" name="lastname" placeholder="Last Name" value={formData.lastname} onChange={handleInputChange} />
         <input type="text" name="email" placeholder="Email" value={formData.email} onChange={handleInputChange} />
         <input type="text" name="phone" placeholder="Phone" value={formData.phone} onChange={handleInputChange} />
         <input type="file" name="attachment" id="attachment" onChange={handleFileChange}/>
         <button>Submit</button>
       </form>
    </>
  )
}
export default FormMailer
