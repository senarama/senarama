import { useState } from 'react';

const useForm = (initialState = {}) => {
  const [data, setData] = useState(initialState);

  const getFormData = () => {
    const formData = new FormData();
    Object.getOwnPropertyNames(data).forEach(
      (val) => formData.append(val, data[val]),
    );
  };

  const handleChange = ({ target }) => {
    switch (target.id) {
      case 'document':
        setData({ ...data, document: target.files[0] });
        break;
      case 'hasProject':
        setData({
          ...data,
          hasProject: target.value === 'yes',
        });
        break;
      case 'accept':
        setData({
          ...data,
          [target.id]: target.checked,
        });
        break;
      default:
        setData({ ...data, [target.id]: target.value });
    }
  };
  return {
    data,
    getFormData,
    handleChange,
  };
};

export default useForm;
