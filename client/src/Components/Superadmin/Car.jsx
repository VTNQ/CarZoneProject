import axios from 'axios';
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Select from 'react-select';
import { components } from 'react-select';
import Swal from 'sweetalert2';
import Cookies from 'js-cookie'

export const CarSpm = () => {
    const [CarDataApi, setCarDataApi] = useState([]);
    const [BrandApi, setBrandApt] = useState([]);
    const [ModelApi, setModelApi] = useState([]);
    const [selectedBrand, setSelectedBrand] = useState(null);
    const [selectedModel, setSelectedModel] = useState(null);
    const [selectedColorOutside, setSelectedColorOutside] = useState(null);
    const [ColorOutsideApi, setColorOutsideApi] = useState([]);
    const [selectedColorInside, setSelectedColorInside] = useState(null);
    const [ColorInsideApi, setColorInsideApi] = useState([]);
    const [selectedIdVersion, setSelectedIdVersion] = useState(null);
    const [VersionApi, setVersionApi] = useState([]);
    const [selectedIdForm, setSelectedIdForm] = useState(null);
    const [FormApi, setFormApi] = useState([]);
    const [IsClosingPopup, setIsClosingPopup] = useState(false);
    const navigate = useNavigate();
    const popupContentStyle = {
        background: 'white',
        padding: '20px',
        maxWidth: '400px',
        textAlign: 'center',
        borderRadius: '8px',
        boxShadow: '0 0 10px rgba(0, 0, 0, 0.1)',
        animation: 'flipleft 0.5s',
        zindex: '1000000' // Default animation
    };
    const closingAnimation = {
        animation: 'flipright 0.5s forwards',
    };
    const [CarForm, setCarForm] = useState({
        Name: '',
        IdModel: '',
        Condition: '',
        Engine: '',
        Drivertrain: '',
        FuelType: '',
        MotorSize: '',
        Bhp: '',
        IdColorOutside: '',
        IdColorInside: '',
        Length: '',
        Height: '',
        Width: '',
        NumberOfSeat: '',
        Mileage: '',
        Transmisstion: '',
        IdVersion: '',
        IdForm: '',
        Price: '',
        FuelConsumption: '',
        Weight: '',
        SpeedAbility: '',
        MaxSpeed: '',
        OffRoad: false,
        DateAccept: '',
        heightBetween: '',
        MainPhoto: null,
        SubPhotos: []
    });
    const [loading, setloading] = useState(true)
    // fetch car api
    const fetchDataCar = async () => {
        try {
            const response = await axios.get('http://localhost:5278/api/Car/getCar');
            setCarDataApi(response.data);
        } catch (error) {
            console.error(error);
        } finally {
            setloading(false)
        }
    };

    // Fetch brand data
    const fetchBrandData = async () => {
        try {
            const response = await axios.get('http://localhost:5278/api/Brand/getBrand');
            const brandOptions = response.data.result.map(brand => ({
                value: brand.id,
                label: brand.name
            }));
            console.log(brandOptions)
            setBrandApt(brandOptions);
            
            
        } catch (error) {
            console.error('Error fetching brands:', error);
        }
    };
    console.log(BrandApi)
    // Fetch color data
    const fetchColorData = async () => {
        try {
            const response = await axios.get('http://localhost:5278/api/Color/ShowColor');
            const colorOptions = response.data.result.map(color => ({
                value: color.id,
                label: color.name,
                color: color.name
            }));
            setColorOutsideApi(colorOptions);
            setColorInsideApi(colorOptions);
        } catch (error) {
            console.error('Error fetching colors:', error);
        }
    };

    // Fetch version data
    const fetchVersionData = async () => {
        try {
            const response = await axios.get('http://localhost:5278/api/Version/ShowVersion');
            const versionOptions = response.data.result.map(version => ({
                value: version.id,
                label: version.relaseYear
            }));
            setVersionApi(versionOptions);
        } catch (error) {
            console.error('Error fetching versions:', error);
        }
    };

    // Fetch form data
    const fetchFormData = async () => {
        try {
            const response = await axios.get('http://localhost:5278/api/Form/ShowForm');
            const formOptions = response.data.result.map(form => ({
                value: form.id,
                label: form.name
            }));
            setFormApi(formOptions);
        } catch (error) {
            console.error('Error fetching forms:', error);
        }
    };

    // Fetch model data based on selected brand
    const fetchDataModel = async (brandId) => {
        try {
            const response = await axios.get(`http://127.0.0.1:5278/api/Warehouse/findModelByBrand/${brandId}`);
            const modelOptions = response.data.map(model => ({
                value: model.id,
                label: model.name
            }));
            setModelApi(modelOptions);
            setSelectedModel(null);
        } catch (error) {
            console.error(error);
        }
    };

    useEffect(() => {
        fetchDataCar();
        fetchBrandData();
        fetchColorData();
        fetchVersionData();
        fetchFormData();
    }, []);

    // Functions to handle input changes
    const handleInputChange = (event) => {
        const { name, value } = event.target;
        setCarForm({ ...CarForm, [name]: value });
    };

    const handleSelectBrand = (selectedOption) => {
        setSelectedBrand(selectedOption);
        fetchDataModel(selectedOption.value);
    };

    const handleSelectModel = (selectedOptionModel) => {
        setSelectedModel(selectedOptionModel);
        setCarForm({ ...CarForm, IdModel: selectedOptionModel.value });
    };

    const handleSelectIdColorOutside = (selectedOptionColorOutside) => {
        setSelectedColorOutside(selectedOptionColorOutside);
        setCarForm({ ...CarForm, IdColorOutside: selectedOptionColorOutside.value });
    };

    const handleSelectedIdInside = (OptionColorInside) => {
        setSelectedColorInside(OptionColorInside);
        setCarForm({ ...CarForm, IdColorInside: OptionColorInside.value });
    };

    const handleSelectedVersion = (OptionVersion) => {
        setSelectedIdVersion(OptionVersion);
        setCarForm({ ...CarForm, IdVersion: OptionVersion.value });
    };

    const handleSelectedForm = (OptionForm) => {
        setSelectedIdForm(OptionForm);
        setCarForm({ ...CarForm, IdForm: OptionForm.value });
    };
    const handleSelectColorOutside = (selectedOption) => {
        setSelectedColorOutside(selectedOption);
    };
    const handleRadioChange = (event) => {
        setCarForm({ ...CarForm, OffRoad: event.target.value === 'true' });
    };

    // Custom styles for react-select
    const customStyles = {
        option: (provided, state) => ({
            ...provided,
            backgroundColor: state.data.color,
            color: 'white',
            padding: 10,
        }),
        singleValue: (provided, state) => ({
            ...provided,
            backgroundColor: state.data.color,
            color: 'white',
            padding: 10,
        })
    };

    const ColorOption = (props) => (
        <components.Option {...props}>
            <div style={{ backgroundColor: props.data.color, color: 'white', padding: '5px' }}>
                {props.data.label}
            </div>
        </components.Option>
    );
    const [imagePreView, setImagePreView] = useState(null);
    const handleImageChange = (event) => {
        const file = event.target.files[0];
        if (file) {
            const render = new FileReader();
            render.onloadend = () => {
                setImagePreView(render.result);
            }

            render.readAsDataURL(file);
            setCarForm({
                ...CarForm,
                MainPhoto: file,
            });
        }
    }
    const [sessionData, setSessionData] = useState(null);
    const getUserSession=()=>{
        const UserSession=Cookies.get("UserSession");
        if(UserSession){
            return JSON.parse(UserSession);
        }
        return null;
    }
    useEffect(() => {
      const data = getUserSession();
     
      if (data && data.role=='Superadmin') {
          setSessionData(data);
      } else{
        navigate('/login');
      }
  }, [navigate]);
    const [subPhotoPreviews, setSubPhotoPreviews] = useState([]);

    const handleImageChangeSubphoto = (event) => {
        const files = Array.from(event.target.files).slice(0, 4); // Limit files to first four only
        let subPhotos = [];
        let subPhotoPreviewsTemp = [];

        for (let i = 0; i < files.length; i++) {
            const reader = new FileReader();
            reader.onloadend = () => {
                subPhotoPreviewsTemp.push(reader.result);
                if (subPhotoPreviewsTemp.length === files.length) {
                    setSubPhotoPreviews(subPhotoPreviewsTemp);
                }
            };
            reader.readAsDataURL(files[i]);
            subPhotos.push(files[i]);
        }

        setCarForm({
            ...CarForm,
            SubPhotos: subPhotos
        });

        // Alert the user if more than four images are attempted to be uploaded
        if (event.target.files.length > 4) {
            Swal.fire({
                icon: 'warning',
                title: 'Only the first 4 images are uploaded',
                showConfirmButton: true
            });
        }
    };


    const handleSubmit = async (event) => {
        event.preventDefault();

        if (CarForm.Name === '' || CarForm.Price === '') {
            Swal.fire({
                icon: 'error',
                title: 'empty field',
                timer: 1500
            });
            return;
        }

        const formData = new FormData();
        formData.append("Name", CarForm.Name);
        formData.append("IdModel", CarForm.IdModel);
        formData.append("Condition", CarForm.Condition);
        formData.append("Engine", CarForm.Engine);
        formData.append("Drivertrain", CarForm.Drivertrain);
        formData.append("FuelType", CarForm.FuelType);
        formData.append("MotorSize", CarForm.MotorSize);
        formData.append("Bhp", CarForm.Bhp);
        formData.append("IdColorOutSide", CarForm.IdColorOutside);
        formData.append("IdColorInSide", CarForm.IdColorInside);
        formData.append("Length", CarForm.Length);
        formData.append("Height", CarForm.Height);
        formData.append("Width", CarForm.Width);
        formData.append("NumberOfSeat", CarForm.NumberOfSeat);
        formData.append("Mileage", CarForm.Mileage);
        formData.append("Transmission", CarForm.Transmisstion);
        formData.append("IdVersion", CarForm.IdVersion);
        formData.append("IdForm", CarForm.IdForm);
        formData.append("Price", CarForm.Price);
        formData.append("FuelConsumption", CarForm.FuelConsumption);
        formData.append("Weight", CarForm.Weight);
        formData.append("SpeedAbility", CarForm.SpeedAbility);
        formData.append("MaxSpeed", CarForm.MaxSpeed);
        formData.append("OffRoad", CarForm.OffRoad);
        formData.append("HeightBetween", CarForm.heightBetween);
        formData.append("MainPhoto", CarForm.MainPhoto);

        CarForm.SubPhotos.forEach((photo, index) => {
            if (index < 4) {
                formData.append("SubPhotos", photo);
            }
        });

        console.log("Form Data before sending:", Object.fromEntries(formData.entries()));

        try {
            const response = await fetch('http://127.0.0.1:5278/api/Car/addCar', {
                method: 'POST',
                body: formData
            });

            if (response.ok) {
                Swal.fire({
                    icon: 'success',
                    title: 'add car success',
                    timer: 1500
                });
                fetchDataCar();
                setCarForm({
                    Name: '',
        IdModel: '',
        Condition: '',
        Engine: '',
        Drivertrain: '',
        FuelType: '',
        MotorSize: '',
        Bhp: '',
        IdColorOutside: '',
        IdColorInside: '',
        Length: '',
        Height: '',
        Width: '',
        NumberOfSeat: '',
        Mileage: '',
        Transmisstion: '',
        IdVersion: '',
        IdForm: '',
        Price: '',
        FuelConsumption: '',
        Weight: '',
        SpeedAbility: '',
        MaxSpeed: '',
        OffRoad: false,
        DateAccept: '',
        heightBetween: '',
        MainPhoto: null,
        SubPhotos: []
                });
                setSelectedColorInside(null);
                setSelectedColorOutside(null);
                setSelectedIdForm(null);
                setSelectedBrand(null);
                setSelectedModel(null);
                setSelectedIdVersion(null);
                setImagePreView('')
                setSubPhotoPreviews([])
              
            } else {
                const responseBody = await response.json();
                console.log("Form Data after failure: ", responseBody); // In lại dữ liệu formData khi thất bại
                Swal.fire({
                    icon: 'error',
                    title: 'add car failed',
                    timer: 1500
                });
            }
        } catch (error) {
            console.error("Error: ", error);
        }
    };

    return (
        <>
            {loading && (
                <div
                    className="fixed top-0 left-0 w-full h-full bg-gray-900 bg-opacity-50 flex justify-center items-center z-50" style={{ zIndex: '10000' }}>
                    <div className="animate-spin rounded-full h-16 w-16 border-t-4 border-b-4 border-primary-600"></div>
                </div>

            )}
            <div className="main-panel">
                <div className="content-wrapper">
                    <div className="row">
                        <div className="col-md-9 grid-margin stretch-card">
                            <div className="card">
                                <div className="card-body">
                                    <h4 className="card-title">Create Car Product</h4>
                                    <p className="card-description">Let’s add some new car details!!</p>
                                    <form className="form-sample" onSubmit={handleSubmit}>
                                        <p className="card-description">Personal info</p>
                                        <div className="row">
                                            <div className="col-md-6">
                                                <div className="form-group">
                                                    <label htmlFor="name">Name Car</label>
                                                    <input type="text" name="Name" value={CarForm.Name} onChange={handleInputChange} className="form-control" id="name" placeholder="Name Car" />
                                                </div>
                                                <div className="form-group">
                                                    <label htmlFor="price">Price</label>
                                                    <input type="number" name="Price" value={CarForm.Price} onChange={handleInputChange} className="form-control" id="price" placeholder="Price" />
                                                </div>
                                                <div className="form-group">
                                                    <label htmlFor="condition">Condition</label>
                                                    <input type="text" name="Condition" value={CarForm.Condition} onChange={handleInputChange} className="form-control" id="condition" placeholder="Condition" />
                                                </div>
                                                <div className="form-group">
                                                    <label htmlFor="engine">Engine</label>
                                                    <input type="text" name="Engine" value={CarForm.Engine} onChange={handleInputChange} className="form-control" id="engine" placeholder="Engine" />
                                                </div>
                                                <div className="form-group">
                                                    <label htmlFor="drivertrain">Drivertrain</label>
                                                    <input type="text" name="Drivertrain" value={CarForm.Drivertrain} onChange={handleInputChange} className="form-control" id="drivertrain" placeholder="Drivertrain" />
                                                </div>
                                                <div className="form-group">
                                                    <label htmlFor="fuelType">Fuel Type</label>
                                                    <input type="text" name="FuelType" value={CarForm.FuelType} onChange={handleInputChange} className="form-control" id="fuelType" placeholder="Fuel Type" />
                                                </div>
                                                <div className="form-group">
                                                    <label htmlFor="motorSize">Motor Size</label>
                                                    <input type="text" name="MotorSize" value={CarForm.MotorSize} onChange={handleInputChange} className="form-control" id="motorSize" placeholder="Motor Size" />
                                                </div>
                                                <div className="form-group">
                                                    <label htmlFor="bhp">Bhp</label>
                                                    <input type="text" name="Bhp" value={CarForm.Bhp} onChange={handleInputChange} className="form-control" id="bhp" placeholder="Bhp" />
                                                </div>
                                                <div className="form-group">
                                                    <label htmlFor="numberOfSeat">Number Of Seat</label>
                                                    <input type="number" name="NumberOfSeat" value={CarForm.NumberOfSeat} onChange={handleInputChange} className="form-control" id="numberOfSeat" placeholder="Number Of Seat" />
                                                </div>
                                                <div className="form-group">
                                                    <label htmlFor="dimensions">Length & Width & Height</label>
                                                    <div className="flex gap-2">
                                                        <input type="text" name="Length" value={CarForm.Length} onChange={handleInputChange} className="form-control" id="length" placeholder="Length" />
                                                        <input type="text" name="Width" value={CarForm.Width} onChange={handleInputChange} className="form-control" id="width" placeholder="Width" />
                                                        <input type="text" name="Height" value={CarForm.Height} onChange={handleInputChange} className="form-control" id="height" placeholder="Height" />
                                                    </div>
                                                </div>
                                                <div className="form-group">
                                                    <label>Main Photo</label>
                                                    <input type="file" className="form-control" id='mainPhoto' name='MainPhoto' onChange={handleImageChange} />
                                                    {imagePreView && (
                                                        <div className="image-preview">
                                                            <img src={imagePreView} alt="Preview" className="preview-image" />
                                                        </div>
                                                    )}
                                                </div>
                                                <div className="form-group">
                                                    <label>Sub Photos (4 pics)</label>
                                                    <input type="file" className="form-control" id='subPhotos' name='SubPhotos' multiple onChange={handleImageChangeSubphoto} />
                                                    <div className='flex '>
                                                        {subPhotoPreviews.map((photo, index) => (
                                                            <div key={index} className="image-preview">
                                                                <img src={photo} alt={`Sub Photo ${index + 1}`} className="preview-image " />
                                                            </div>
                                                        ))}
                                                    </div>
                                                </div>
                                            </div>
                                            <div className="col-md-6">
                                                <div className="form-group">
                                                    <label htmlFor="brand">Brand</label>
                                                    <Select
                                                        value={selectedBrand}
                                                        onChange={handleSelectBrand}
                                                        options={BrandApi}
                                                        placeholder="Select Brand"
                                                    />
                                                </div>
                                                <div className="form-group">
                                                    <label htmlFor="model">Model</label>
                                                    <Select
                                                        value={selectedModel}
                                                        onChange={handleSelectModel}
                                                        options={ModelApi}
                                                        placeholder="Select Car Model"
                                                        isDisabled={!selectedBrand}
                                                    />
                                                </div>
                                                <div className="form-group">
                                                    <label htmlFor="form">Form</label>
                                                    <Select
                                                        value={selectedIdForm}
                                                        onChange={handleSelectedForm}
                                                        options={FormApi}
                                                        placeholder="Select a Form Car"
                                                    />
                                                </div>
                                                <div className="form-group">
                                                    <label htmlFor="version">Version</label>
                                                    <Select
                                                        value={selectedIdVersion}
                                                        onChange={handleSelectedVersion}
                                                        options={VersionApi}
                                                        placeholder="Select a Version of car"
                                                    />
                                                </div>
                                                <div className="form-group">
                                                    <label htmlFor="colors">Color outside & inside</label>
                                                    <div className="flex gap-2">
                                                        <Select
                                                            value={selectedColorOutside}
                                                            onChange={handleSelectIdColorOutside}
                                                            options={ColorOutsideApi}
                                                            styles={customStyles}
                                                            components={{ Option: ColorOption }}
                                                            placeholder="Select Color Outside"
                                                        />
                                                        <Select
                                                            value={selectedColorInside}
                                                            onChange={handleSelectedIdInside}
                                                            options={ColorInsideApi}
                                                            styles={customStyles}
                                                            components={{ Option: ColorOption }}
                                                            placeholder="Select Color Inside"
                                                        />
                                                    </div>
                                                </div>
                                                <div className="form-group">
                                                    <label htmlFor="transmission">Transmission</label>
                                                    <input type="text" name="Transmisstion" value={CarForm.Transmisstion} onChange={handleInputChange} className="form-control" id="transmission" placeholder="Transmission" />
                                                </div>
                                                <div className="form-group">
                                                    <label htmlFor="fuelConsumption">Fuel Consumption</label>
                                                    <input type="text" name="FuelConsumption" value={CarForm.FuelConsumption} onChange={handleInputChange} className="form-control" id="fuelConsumption" placeholder="Fuel Consumption" />
                                                </div>
                                                <div className="form-group">
                                                    <label htmlFor="performance">Speed Ability & Max speed & Height Between</label>
                                                    <div className="flex gap-2">
                                                        <input type="number" name="SpeedAbility" value={CarForm.SpeedAbility} onChange={handleInputChange} className="form-control" id="speedAbility" placeholder="Speed Ability" />
                                                        <input type="number" name="MaxSpeed" value={CarForm.MaxSpeed} onChange={handleInputChange} className="form-control" id="maxSpeed" placeholder="Max Speed" />
                                                        <input type="number" name="heightBetween" value={CarForm.heightBetween} onChange={handleInputChange} className="form-control" id="heightBetween" placeholder="Height Between" />
                                                    </div>
                                                </div>
                                                <div className="form-group">
                                                    <div className='flex gap-2'>
                                                        <div>
                                                            <label htmlFor="mileage">Mileage</label>
                                                            <input type="text" name="Mileage" value={CarForm.Mileage} onChange={handleInputChange} className="form-control" id="mileage" placeholder="Mileage" />
                                                        </div>
                                                        <div>
                                                            <label htmlFor="weight">Weight</label>
                                                            <input type="number" name="Weight" value={CarForm.Weight} onChange={handleInputChange} className="form-control" id="weight" placeholder="Weight" />
                                                        </div>
                                                    </div>
                                                </div>
                                                <div className="form-group">
                                                    <label htmlFor="offroad"> Off Road</label>
                                                    <div className="form-check ml-6">
                                                        <input type="radio" name="OffRoad" value="true" checked={CarForm.OffRoad === true} onChange={handleRadioChange} className="form-check-input" id="offroadYes" />
                                                        <label className="form-check-label" htmlFor="offroadYes">Yes</label>
                                                    </div>
                                                    <div className="form-check ml-6">
                                                        <input type="radio" name="OffRoad" value="false" checked={CarForm.OffRoad === false} onChange={handleRadioChange} className="form-check-input" id="offroadNo" />
                                                        <label className="form-check-label" htmlFor="offroadNo">No</label>
                                                    </div>
                                                </div>
                                                <div className="box-footer">
                                                    <button type='submit' className="btn btn-primary btn-icon-text"><i className="ti-file btn-icon-prepend"></i>Add</button>
                                                </div>
                                            </div>
                                        </div>
                                    </form>
                                </div>
                            </div>
                        </div>
                        <div className="col-md-3 grid-margin stretch-card">
                            <div className="card">
                                <div className="card-body">
                                    <div className='flex gap-[30px] items-center'>
                                        <h4 className="card-title">Car Table</h4>
                                        <button className="btn btn-dark btn-icon-text" onClick={() => navigate('/superadmin/carTable')}>Car Page</button>
                                    </div>
                                    <p className="card-description">Hi Superadmin! How are you doing?</p>
                                    <div className="table-responsive">
                                        <table className="table table-hover">
                                            <thead>
                                                <tr>
                                                    <th>Id</th>
                                                    <th>Car Name</th>

                                                </tr>
                                            </thead>
                                            <tbody>
                                                {CarDataApi.map((car, index) => (
                                                    <tr key={car.id}>
                                                        <td>{index + 1}</td>
                                                        <td>{car.name}</td>

                                                    </tr>
                                                ))}
                                            </tbody>
                                        </table>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>


            </div>
        </>

    );
}
