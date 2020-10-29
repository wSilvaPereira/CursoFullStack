import React from 'react';

export default function File_Reader() {
  let fileReader;
  // const extensao = fileName.split('.').pop();

  // const handleFiles = (files) => {
  //   console.log(files);
  // };

  const handleFileRead = (e) => {
    const content = fileReader.result;
    console.log(content);
    // … do something with the 'content' …
  };

  const handleFileChosen = (file) => {
    fileReader = new FileReader();
    // console.log(fileReader);
    fileReader.onloadend = handleFileRead;
    fileReader.readAsText(file);
  };

  return (
    <div>
      <input
        type="file"
        id="file"
        className="input-file"
        accept=".csv"
        onChange={(e) => handleFileChosen(e.target.files[0])}
      />
    </div>
  );
}
