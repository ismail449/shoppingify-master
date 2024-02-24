"use server"

export const addItem = (formData: FormData)=>{
  for (let [key, value] of formData.entries()) {
    console.log(`${key}: ${value}`);
  }
}