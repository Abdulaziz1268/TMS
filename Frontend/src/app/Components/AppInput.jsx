function AppInput({
  type,
  placeholder,
  src,
  onChange,
  onClick,
  ...otherProps
}) {
  return (
    <div className="inputContainer">
      <input
        type={type}
        placeholder={placeholder}
        className="input"
        onChange={onChange}
        {...otherProps}
      />
      {src && (
        <img
          className="showPasswordIcon"
          onClick={onClick}
          src={src}
          alt="show password"
        />
      )}
    </div>
  )
}

export default AppInput
