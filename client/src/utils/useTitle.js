import { useEffect } from "react";

function useTitle(title) {
  useEffect(() => {
    document.title = `${title} | DL`;
  }, [title]);
}

export default useTitle;
