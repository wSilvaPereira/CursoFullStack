window.addEventListener('load', () => {
  // import axios from 'axios';
  // async function tryGet() {
  //   const res = await fetch(
  //     'http://servidor-071:8080/GrImg/webresources/imagemService/getImagem/ASSDIGL2/81900/0/954144.pdf/eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJoYXNoIjoiOTIzNi45MzVmLjFhMGMuMWJhNy4yMWQwLjczM2IuNjVmNi5jZTQ3LjE1YjguODgxYyJ9.N9t4JxGA7k5znVzJx9f6YgD5tuwHsgfvDwFuwcE3DDM',
  //     { mode: 'no-cors' }
  //   );
  //   console.log(res);
  //   const json = await res.json();
  //   console.log(json);
  // }

  function tryGet() {
    fetch(
      'http://servidor-071:8080/GrImg/webresources/imagemService/getImagem/ASSDIGL2/81900/0/954144.pdf/eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJoYXNoIjoiOTIzNi45MzVmLjFhMGMuMWJhNy4yMWQwLjczM2IuNjVmNi5jZTQ3LjE1YjguODgxYyJ9.N9t4JxGA7k5znVzJx9f6YgD5tuwHsgfvDwFuwcE3DDM',
      { mode: 'no-cors', keepalive: 'true' }
    ).then((res) => {
      console.log(res);
    });
  }

  tryGet();
});
