import { useState, useRef } from 'react';
import { useSearchParams } from 'react-router-dom';

export default function Perfil() {
  const [searchParams] = useSearchParams();
  const email = searchParams.get('email');

  const [isEditing, setIsEditing] = useState(false);
  const [userData, setUserData] = useState({
    nombre: "Julisa Araya",
    edad: 28,
    ciudad: "Santiago",
    comuna: "Maipú",
    telefono: "+56 9 8765 4321",
  });

  // --- Estados y referencias para la cámara ---
  const [profileImage, setProfileImage] = useState(null); // Almacenará la foto tomada
  const [isCameraOpen, setIsCameraOpen] = useState(false); // Controla la vista de la cámara
  const videoRef = useRef(null); // Referencia al elemento de video
  const canvasRef = useRef(null); // Referencia al canvas (oculto) para tomar la foto

  const handleChange = (e) => {
    const { name, value } = e.target;
    setUserData(prevData => ({ ...prevData, [name]: value }));
  };

  const handleEditToggle = () => setIsEditing(!isEditing);

  // --- Funciones para la cámara ---
  const handleOpenCamera = async () => {
    setIsCameraOpen(true);
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ video: true });
      if (videoRef.current) {
        videoRef.current.srcObject = stream;
      }
    } catch (err) {
      console.error("Error al acceder a la cámara: ", err);
      alert("No se pudo acceder a la cámara. Asegúrate de dar los permisos necesarios.");
      setIsCameraOpen(false);
    }
  };

  const handleCloseCamera = () => {
    if (videoRef.current && videoRef.current.srcObject) {
      videoRef.current.srcObject.getTracks().forEach(track => track.stop());
    }
    setIsCameraOpen(false);
  };

  const handleCapture = () => {
    const video = videoRef.current;
    const canvas = canvasRef.current;
    if (video && canvas) {
      canvas.width = video.videoWidth;
      canvas.height = video.videoHeight;
      const context = canvas.getContext('2d');
      context.drawImage(video, 0, 0, canvas.width, canvas.height);
      const photo = canvas.toDataURL('image/png');
      setProfileImage(photo);
      handleCloseCamera();
    }
  };

  return (
    <div className="container mt-5">
      <div className="card shadow-sm mx-auto" style={{ maxWidth: '700px' }}>
        <div className="card-header text-center">
          <h2>Perfil de Usuario</h2>
        </div>
        <div className="card-body p-4">
          {isCameraOpen ? (
            // --- VISTA DE LA CÁMARA ---
            <div className="text-center">
              <h5 className="mb-3">Apunta y sonríe</h5>
              <video ref={videoRef} autoPlay playsInline style={{ width: '100%', borderRadius: '8px' }}></video>
              <canvas ref={canvasRef} style={{ display: 'none' }}></canvas>
              <div className="mt-3">
                <button className="btn btn-success me-2" onClick={handleCapture}>Tomar Foto</button>
                <button className="btn btn-danger" onClick={handleCloseCamera}>Cancelar</button>
              </div>
            </div>
          ) : (
            // --- VISTA NORMAL DEL PERFIL ---
            <>
              <div className="row align-items-center">
                <div className="col-md-4 text-center mb-3 mb-md-0">
                  <div 
                    onClick={handleOpenCamera} 
                    className="mx-auto bg-light d-flex justify-content-center align-items-center rounded-circle position-relative"
                    style={{ width: '150px', height: '150px', color: '#6c757d', border: '3px solid #eee', cursor: 'pointer' }}
                    title="Haz clic para cambiar tu foto"
                  >
                    {profileImage ? (
                      <img src={profileImage} alt="Foto de perfil" className="rounded-circle" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                    ) : (
                      <span style={{fontSize: '0.9rem'}}>Tu Foto</span>
                    )}
                    <div 
                      className="position-absolute bottom-0 end-0 bg-dark text-white rounded-circle d-flex justify-content-center align-items-center"
                      style={{ width: '40px', height: '40px', border: '2px solid white' }}
                    >
                      <span>✏️</span>
                    </div>
                  </div>
                </div>
                <div className="col-md-8">
                  <ul className="list-group list-group-flush">
                    {/* ... (campos de datos como antes) ... */}
                    <li className="list-group-item d-flex justify-content-between align-items-center">
                  <strong>Nombre:</strong>
                  {isEditing ? (
                    <input type="text" name="nombre" value={userData.nombre} onChange={handleChange} className="form-control w-50" />
                  ) : (
                    <span>{userData.nombre}</span>
                  )}
                </li>
                <li className="list-group-item d-flex justify-content-between align-items-center">
                  <strong>Edad:</strong>
                  {isEditing ? (
                    <input type="number" name="edad" value={userData.edad} onChange={handleChange} className="form-control w-50" />
                  ) : (
                    <span>{userData.edad}</span>
                  )}
                </li>
                <li className="list-group-item d-flex justify-content-between align-items-center">
                  <strong>Correo:</strong>
                  <span>{email}</span>
                </li>
                <li className="list-group-item d-flex justify-content-between align-items-center">
                  <strong>Ciudad:</strong>
                  {isEditing ? (
                    <input type="text" name="ciudad" value={userData.ciudad} onChange={handleChange} className="form-control w-50" />
                  ) : (
                    <span>{userData.ciudad}</span>
                  )}
                </li>
                <li className="list-group-item d-flex justify-content-between align-items-center">
                  <strong>Comuna:</strong>
                  {isEditing ? (
                    <input type="text" name="comuna" value={userData.comuna} onChange={handleChange} className="form-control w-50" />
                  ) : (
                    <span>{userData.comuna}</span>
                  )}
                </li>
                <li className="list-group-item d-flex justify-content-between align-items-center">
                  <strong>Contacto:</strong>
                  {isEditing ? (
                    <input type="text" name="telefono" value={userData.telefono} onChange={handleChange} className="form-control w-50" />
                  ) : (
                    <span>{userData.telefono}</span>
                  )}
                </li>
                  </ul>
                </div>
              </div>
              <div className="text-end mt-4">
                <button className="btn btn-primary" onClick={handleEditToggle}>
                  {isEditing ? 'Guardar Cambios' : 'Editar Perfil'}
                </button>
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  );
}