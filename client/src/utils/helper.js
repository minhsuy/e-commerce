export const createSlug = (string) =>
  string
    .toLowerCase()
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .split(" ")
    .join("-");

export const formatMoney = (number) => {
  return Number(number.toFixed(1)).toLocaleString();
};
export const validate = (payload, setInvalidFields) => {
  let invalidsCount = 0;
  const invalidFields = Object.entries(payload);
  ("key : value");
  setInvalidFields([]);
  for (let arr of invalidFields) {
    if (arr[1].trim() === "") {
      invalidsCount++;
      setInvalidFields((prev) => [
        ...prev,
        { name: arr[0], message: `${arr[0].toUpperCase()} is required` },
      ]);
    }
  }

  for (let arr of invalidFields) {
    switch (arr[0]) {
      case "email":
        if (
          !String(arr[1])
            .toLowerCase()
            .match(
              /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|.(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
            )
        ) {
          invalidsCount++;
          setInvalidFields((prev) => [
            ...prev,
            { name: arr[0], message: " Email is invalid" },
          ]);
        }
        break;
      case "password":
        if (arr[1].length < 6) {
          invalidsCount++;
          setInvalidFields((prev) => [
            ...prev,
            { name: arr[0], message: " must be 6 characters" },
          ]);
        }
        break;
      default:
        break;
    }
  }

  return invalidsCount;
};

export const formatPrice = (number) => {
  return Math.round(number / 1000) * 1000;
};

// Hàm generateRange giúp tạo ra dãy số trang từ start đến end
export const generateRange = (start, end) => {
  const range = [];
  for (let i = start; i <= end; i++) {
    range.push(i);
  }
  return range;
};

export const imageToBase64 = (file) =>
  new Promise(function (resolve, reject) {
    let reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => resolve(reader.result);
    reader.onerror = (error) => reject("Error: ", error);
  });
