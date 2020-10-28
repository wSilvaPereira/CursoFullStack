import React, { useEffect, useState } from 'react';
import Forms from './components/Forms';
import Installments from './components/Installments';
import css from './components/installments.module.css';

export default function App() {
  const [capitalInicial, setCapitalInicial] = useState(70000);
  const [jurosMensal, setjurosMensal] = useState(-2);
  const [parcelas, setParcelas] = useState(24);
  const [listaParcelas, setListaParcelas] = useState([]);

  useEffect(() => {
    let lista = [];
    let novoValor = capitalInicial;

    if (capitalInicial && jurosMensal && parcelas) {
      for (let i = 1; i <= parcelas; i++) {
        const calculado = (novoValor * jurosMensal) / 100;
        novoValor = novoValor + calculado;

        const diferenca = novoValor - capitalInicial;
        const difPercentual = (diferenca / capitalInicial) * 100;

        lista.push({ novoValor, diferenca, id: i, difPercentual });

        // console.log({ novoValor, diferenca, id: i, difPercentual });
      }
    }

    setListaParcelas(lista);
  }, [capitalInicial, jurosMensal, parcelas]);

  const handleInfos = (capital, juros, parcelas) => {
    setCapitalInicial(capital);
    setjurosMensal(juros);
    setParcelas(parcelas);
  };

  return (
    <div className=" container z-depth-2" style={{ padding: '60px' }}>
      <h1 style={{ textAlign: 'center' }}>React - Juros Compostos</h1>
      <Forms
        capitalInicial={capitalInicial}
        jurosMensal={jurosMensal}
        parcelas={parcelas}
        onChangeInfos={handleInfos}
      />
      <div className={css.flex1}>
        {listaParcelas.map((parcela) => {
          const { id, novoValor, diferenca, difPercentual } = parcela;
          return (
            <div key={id}>
              <Installments
                id={id}
                novoValor={novoValor}
                diferenca={diferenca}
                difPercentual={difPercentual}
              />
            </div>
          );
        })}
      </div>

      <footer class="page-footer">
        <div class="container">
          <div class="row">
            <div class="col l6 s12">
              <h5 class="white-text">Footer Content</h5>
              <p class="grey-text text-lighten-4">
                You can use rows and columns here to organize your footer
                content.
              </p>
            </div>
            <div class="col l4 offset-l2 s12">
              <h5 class="white-text">Links</h5>
              <ul>
                <li>
                  <a class="grey-text text-lighten-3" href="#!">
                    Link 1
                  </a>
                </li>
                <li>
                  <a class="grey-text text-lighten-3" href="#!">
                    Link 2
                  </a>
                </li>
                <li>
                  <a class="grey-text text-lighten-3" href="#!">
                    Link 3
                  </a>
                </li>
                <li>
                  <a class="grey-text text-lighten-3" href="#!">
                    Link 4
                  </a>
                </li>
              </ul>
            </div>
          </div>
        </div>
        <div class="footer-copyright">
          <div class="container">
            © 2014 Copyright Text
            <a class="grey-text text-lighten-4 right" href="#!">
              More Links
            </a>
          </div>
        </div>
      </footer>
    </div>
  );
}
