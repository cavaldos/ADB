const ItemInput = ({
  label,
  type,
  name,
  placeholder,
  value,
  setValue,
  isEditable,
}) => {
  return (
    <div className="mb-5">
      <label
        className="block text-gray-700 text-sm font-bold mb-2"
        htmlFor={name}
      >
        {label}
      </label>
      <input
        type={type}
        id={name}
        value={value}
        name={name}
        onChange={(e) =>
          setValue((prevData) => ({
            ...prevData,
            [name]: e.target.value,
          }))
        }
        className="rounded-2xl w-full py-2 px-3 text-gray-700 focus:outline-none border"
        placeholder={placeholder}
        disabled={!isEditable}
      />
    </div>
  );
};

export default ItemInput;
