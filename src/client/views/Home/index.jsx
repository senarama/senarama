import Footer from '@components/Footer';
import SlidesShow from '@components/SlidesShow';
import carouselData from '@data/carousel-data';
import Header from '@components/Header';
import backstage from '@images/backstage.jpg';
import foroImage from '@images/foro.jpg';
import knowUsImage from '@images/know-us.jpg';
import newsImage from '@images/news.jpg';
import style from './style.module.scss';

const Home = () => (
  <main className={style.container}>
    <Header />
    <SlidesShow data={carouselData} />
    <div className={style.image_container}>
      <img
        src={knowUsImage}
        alt="Conocenos"
      />
      <img
        src={backstage}
        alt="Tras bambalinas"
      />
      <img
        src={foroImage}
        alt="Foro"
      />
      <img
        src={newsImage}
        alt="Noticias"
      />
    </div>
    <Footer />
  </main>
);

export default Home;
