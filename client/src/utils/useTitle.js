import { useEffect } from "react";

function useTitle(title) {
  useEffect(() => {
    document.title = `${title} | DriveTestPro`;
  }, [title]);
}

export default useTitle;
