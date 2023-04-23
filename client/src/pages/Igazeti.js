import React from "react";
import useTitle from "../utils/useTitle";

function Igazeti() {
  useTitle("Igazeti");

  return (
    <div className="w-full mb-4">
      <h1 className="text-3xl mb-4 font-bold justify-center text-center">Amategeko nubusobanuro bwamagambo</h1>
      <hr className="mb-2" />
      <iframe
        width="90%"
        height="600"
        className="mx-auto border border-spacing-3 border-green-500"
        src="https://www.docdroid.net/7SwCeen/igitabo-cyamatego-yo-mu-muhanda-original-pdf"
        frameborder="0"
        allowtransparency
        allowfullscreen
      ></iframe>
      <h1 className="text-3xl my-4 font-bold justify-center text-center">Imigereka: Ibyapa, ibimenyetso</h1>
      <hr className="mb-2" />
      <iframe
        width="90%"
        height="600"
        className="mx-auto border border-spacing-3 border-green-500"
        src="https://www.docdroid.net/mvVxL0E/igazeti-amategeko-yumuhanda-full-ibyapa-rwanda-pdf"
        frameborder="0"
        allowtransparency
        allowfullscreen
      ></iframe>
    </div>
  );
}

export default Igazeti;
