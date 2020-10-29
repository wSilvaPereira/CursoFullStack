import React from 'react';

import FileReaderInput from 'react-file-reader-input';

export default function FileReader() {
  const handleChange = (e, results) => {
    console.log(e);
    results.forEach((result) => {
      // const [e, file] = result;
      // dispatch(uploadFile(e.target.result));
      // console.log(`Successfully uploaded ${file.name}!`);
    });
  };

  return (
    <div>
      <form>
        <label htmlFor="my-file-input">Upload a File:</label>
        <FileReaderInput as="binary" id="my-file-input" onChange={handleChange}>
          <button>Select a file!</button>
        </FileReaderInput>
      </form>
    </div>
  );
}
