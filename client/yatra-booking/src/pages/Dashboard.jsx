import { User, Car, CableCar, Hotel } from "lucide-react";
import { useNavigate } from "react-router-dom";
function Dashboard() {
    const navigate = useNavigate();
    return (
        <div className="py-12 bg-[#fdf6f6] ">

            {/* 👋 WELCOME SECTION */}
            <div className="pt-2">
                <h2 className="text-5xl text-center font-bold text-orange-800">
                    Plan Your Yatra
                </h2>
                <p className="text-orange-500 text-center mt-4 text-sm font-semibold">
                    Book services for your pilgrimage easily
                </p>
            </div>

            {/* 🔥 SERVICES */}
            <div className="flex items-center justify-center min-h-[60vh] px-10">

                <div className="grid grid-cols-1 md:grid-cols-3 gap-12 w-full max-w-7xl">
                    {/* Accommodation */}
                    <div onClick={() => navigate("/accommodation")} className="bg-white p-10 rounded-3xl shadow-lg hover:shadow-2xl transition cursor-pointer text-center flex flex-col justify-center items-center h-80">
                        <Hotel className="w-20 h-20 text-orange-600 mb-4" />
                        <h3  className="text-2xl font-semibold text-orange-600">Accommodation</h3>
                        <p className="text-gray-500 mt-3">
                            Book rooms for your stay
                        </p>
                    </div>

                    {/* Car Service */}
                    <div onClick={() => navigate("/car-service")}  className="bg-white p-10 rounded-3xl shadow-lg hover:shadow-2xl transition cursor-pointer text-center flex flex-col justify-center items-center h-80">
                        <Car className="w-20 h-20 text-orange-600 mb-4" />
                        <h3 className="text-2xl font-semibold text-orange-600">Car Service</h3>
                        <p className="text-gray-500 mt-3">
                            Book battery car for travel
                        </p>
                    </div>

                    {/*  Ropeway */}
                    <div onClick={() => navigate("/ropeway")} className="bg-white p-10 rounded-3xl shadow-lg hover:shadow-2xl transition cursor-pointer text-center flex flex-col justify-center items-center h-80">
                        <CableCar className="w-20 h-20 text-orange-600 mb-4" />
                        <h3 className="text-2xl font-semibold text-orange-600">Ropeway</h3>
                        <p className="text-gray-500 mt-3">
                            Bhawan to Bhaironath ropeway
                        </p>
                    </div>



                </div>

            </div>

        </div>
    );
}

export default Dashboard;