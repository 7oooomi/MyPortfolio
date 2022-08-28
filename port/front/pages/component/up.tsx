import { storage } from "../../firebase/init";
import { ref, uploadBytes } from "firebase/storage";

// 送信用
export const postImage = async (image: any) => {
  if (image.name) {
    const storageRef = ref(storage, image.name);

    await uploadBytes(storageRef, image).then(async (result) => {
      console.log(result);
      console.log("Uploaded a blob or file!");
      alert("Uploaded success!!");
    });
  }
  return image.name;
};
