import style from './style.module.scss';

const Footer = () => (
  <footer className={style.footer}>
    <div className={style.content}>
      <p>
        Servicio Nacional de Aprendizaje SENA - Centro de formación en
        Actividad Física y Cultura Regional Distrito Capital
      </p>
      <p>
        Dirección: Trans. 78J No, 41 D - 15 Sur Localidad Kennedy
        BogotáD.C -Teléfono: 5461500 Ext: 16552
      </p>
      <p>
        Conmutador Nacional (57 1) 5461500 - Extensiones
      </p>
      <p>
        Atención telefónica: Lunes a Viernes 7:00 a.m. a7:00 p.m. - Sábados
        8:00 a.m. a 1:00 p.m.
      </p>
      <p>
        Atención al ciudadano: Bogotá (57 1) 3430111 - Línea gratuita y
        resto del país 018000 910270
      </p>
      <p>
        Atención al empresario: Bogotá (57 1) 3430101 - Línea gratuita y
        resto del país 018000 910682
      </p>
      <p><span>SENARAMA</span></p>
    </div>
  </footer>
);

export default Footer;
