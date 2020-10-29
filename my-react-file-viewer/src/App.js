import { PDFViewer } from '@react-pdf/renderer';
import React, { Component } from 'react';
import FileReader from './components/FileReader';
import PdfReader from './components/PdfReader';

export default class App extends Component {
  render() {
    return (
      <div>
        {/* <FileReader fileName="C:/PDFs de Teste/954144.pdf" /> */}
        <PdfReader />
      </div>
    );
  }
}
