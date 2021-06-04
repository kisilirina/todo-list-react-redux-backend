const Loader = () => {
  return (
    <div className="d-flex justify-content-center">
      <div className="spinner-border text-success " style={{width: '3rem', height: '3rem', role:'status'}}>
        <span className="visually-hidden"></span>
      </div>
    </div>
  );
}

export default Loader;

