function reader(file, callback) {
  const fr = new FileReader();
  fr.onload = () => callback(null, fr.result);
  fr.onerror = (err) => callback(err);
  fr.readAsDataURL(file);
}

export function uploadFile(ev, { product, setProduct } = productSetting) {
  let name = ev.target.name,
    file = ev.target.files[0];

  const fileTypes = [
    "image/apng",
    "image/bmp",
    "image/gif",
    "image/jpeg",
    "image/pjpeg",
    "image/png",
    "image/svg+xml",
    "image/tiff",
    "image/webp",
    "image/x-icon",
  ];

  if (fileTypes.includes(file.type)) {
    if (file.size <= 1048576) {
      reader(file, (err, res) => {
        if (err) {
          console.error(err);
        } else {
          setProduct({ ...product, [name]: res });
        }
      });
    } else {
      alert("File should be less than 1MB");
    }
  } else {
    alert("Invalid file MIME type");
  }
}
