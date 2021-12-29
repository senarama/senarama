import Carousel from 'react-bootstrap/Carousel';
import PropTypes from 'prop-types';
import style from './style.module.scss';

const SlidesShow = ({ data }) => (
  <Carousel>
    {
      data.map(({ src, description, title }, pos) => (
        <Carousel.Item key={`crs-${parseInt(pos, 16)}`}>
          <img
            className={`d-block w-100 ${style.crs_image}`}
            src={src}
            alt={title}
            style={{ objectFit: 'cover' }}
          />
          <Carousel.Caption>
            <h3>{title}</h3>
            <p>{description}</p>
          </Carousel.Caption>
        </Carousel.Item>
      ))
    }
  </Carousel>
);

SlidesShow.propTypes = {
  data: PropTypes.arrayOf(PropTypes.shape({})).isRequired,
};

SlidesShow.defaultProps = {
};

export default SlidesShow;
