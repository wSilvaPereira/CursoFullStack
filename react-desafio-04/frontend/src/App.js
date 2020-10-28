import React, { useEffect, useState } from 'react';
import * as api from './api/apiServices.js';
import GradesControl from './components/GradesControl.js';
import ModalGrade from './components/ModalGrade.js';
import Spinner from './components/Spinner.js';

export default function App() {
  const [allGrades, setAllGrades] = useState([]);
  const [selectedGrade, setSelectedGrade] = useState({});
  const [isModalOpen, setIsModalOpen] = useState(false);

  useEffect(() => {
    const getGrades = async () => {
      const grades = await api.getAllGrades();
      setAllGrades(grades);
    };
    setTimeout(() => {
      getGrades();
    }, 1000);
  }, []);

  const handleDelete = async (gradeToDelete) => {
    const isDeleted = await api.deleteGrade(gradeToDelete);
    if (isDeleted) {
      const deletedGradeIndex = allGrades.findIndex((grade) => {
        return grade.id === gradeToDelete.id;
      });

      const newGrades = Object.assign([], allGrades);
      newGrades[deletedGradeIndex].isDeleted = true;
      newGrades[deletedGradeIndex].value = 0;

      setAllGrades(newGrades);
    }
  };
  const handlePersist = (grade) => {
    setSelectedGrade(grade);
    setIsModalOpen(true);
  };

  const handlePersistData = (grade) => {};
  const handleClose = () => {};

  return (
    <div className="container z-depth-2">
      <h1 className="center">Controle de notas</h1>
      {allGrades.length === 0 && <Spinner description="Carregando..." />}
      {allGrades.length > 0 && (
        <GradesControl
          grades={allGrades}
          onDelete={handleDelete}
          onPersist={handlePersist}
        />
      )}
      {isModalOpen && (
        <ModalGrade
          onSave={handlePersistData}
          onClose={handleClose}
          selectedGrade={selectedGrade}
        />
      )}
    </div>
  );
}
