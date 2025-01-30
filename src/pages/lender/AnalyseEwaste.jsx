import React, { useState, useEffect } from "react";
import {
  Upload,
  AlertCircle,
  Loader2,
  Zap,
  Recycle,
  AlertTriangle,
} from "lucide-react";
import { useNavigate } from "react-router-dom";

const AnalyseEwaste = () => {
  const navigate = useNavigate();
  const [selectedImage, setSelectedImage] = useState(null);
  const [previewUrl, setPreviewUrl] = useState("");
  const [analysis, setAnalysis] = useState(null);
  const [loading, setLoading] = useState(false);
  const [dragActive, setDragActive] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    const userStr = localStorage.getItem("user");
    if (!userStr) {
      navigate("/login");
      return;
    }

    const user = JSON.parse(userStr);
    if (user.role !== "lender") {
      navigate("/login");
      return;
    }
  }, [navigate]);

  useEffect(() => {
    return () => {
      if (previewUrl) {
        URL.revokeObjectURL(previewUrl);
      }
    };
  }, [previewUrl]);

  const handleImageUpload = (event) => {
    const file = event.target.files[0];
    if (file) {
      if (file.size > 10 * 1024 * 1024) {
        setError("File size must be less than 10MB");
        return;
      }
      setSelectedImage(file);
      setPreviewUrl(URL.createObjectURL(file));
      setAnalysis(null);
      setError("");
    }
  };

  const handleDrag = (e) => {
    e.preventDefault();
    e.stopPropagation();
    if (e.type === "dragenter" || e.type === "dragover") {
      setDragActive(true);
    } else if (e.type === "dragleave") {
      setDragActive(false);
    }
  };

  const handleDrop = (e) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);

    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      const file = e.dataTransfer.files[0];
      if (file.size > 10 * 1024 * 1024) {
        setError("File size must be less than 10MB");
        return;
      }
      setSelectedImage(file);
      setPreviewUrl(URL.createObjectURL(file));
      setAnalysis(null);
      setError("");
    }
  };

  const analyzeImage = async (e) => {
    e.preventDefault();
    if (!selectedImage) return;

    setLoading(true);
    setError("");

    try {
      // Simulated API call
      await new Promise((resolve) => setTimeout(resolve, 2000));

      const mockAnalysis = {
        type: "Electronic Circuit Board",
        components: [
          "Capacitors",
          "Resistors",
          "Integrated Circuits",
          "Copper Traces",
        ],
        hazardousLevel: "Medium",
        recyclability: "85%",
        recommendedDisposal: "Certified E-waste Recycler",
        estimatedValue: "$5-10",
        environmentalImpact: "Moderate",
        recyclingSteps: [
          "Remove hazardous components",
          "Separate metals",
          "Process PCB materials",
          "Recover precious metals",
        ],
      };

      setAnalysis(mockAnalysis);
    } catch (err) {
      setError("Analysis failed. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 via-blue-50 to-purple-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between mb-8 gap-4">
          <h1 className="text-3xl font-bold text-gray-900">E-waste Analysis</h1>
          <button
            onClick={() => navigate("/lender")}
            className="inline-flex items-center justify-center px-6 py-2.5 text-sm font-medium text-white bg-blue-600 rounded-lg hover:bg-blue-700 focus:ring-4 focus:ring-blue-300 transition-all duration-300 shadow-sm hover:shadow-md"
          >
            Back to Dashboard
          </button>
        </div>

        <div className="grid lg:grid-cols-2 gap-8">
          {/* Upload Section */}
          <div className="bg-white rounded-xl shadow-lg p-6">
            <h2 className="text-xl font-semibold text-gray-900 mb-4">
              Upload E-waste Image
            </h2>

            {error && (
              <div className="mb-4 flex items-center gap-2 text-red-600 bg-red-50 p-3 rounded-lg">
                <AlertCircle className="w-5 h-5" />
                <span>{error}</span>
              </div>
            )}

            <div
              className={`relative cursor-pointer flex flex-col items-center justify-center p-8 border-2 border-dashed rounded-xl transition-all ${
                dragActive
                  ? "border-blue-500 bg-blue-50"
                  : "border-gray-300 hover:border-gray-400 bg-gray-50"
              }`}
              onDragEnter={handleDrag}
              onDragLeave={handleDrag}
              onDragOver={handleDrag}
              onDrop={handleDrop}
              onClick={() => document.getElementById("image-upload").click()}
            >
              {!previewUrl ? (
                <>
                  <Upload className="w-12 h-12 text-gray-400 mb-4" />
                  <p className="text-gray-600 text-center mb-2">
                    Click to upload or drag and drop
                  </p>
                  <p className="text-sm text-gray-500">PNG, JPG up to 10MB</p>
                </>
              ) : (
                <div className="relative w-full">
                  <img
                    src={previewUrl}
                    alt="E-waste preview"
                    className="w-full h-64 object-contain rounded-lg"
                  />
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      setPreviewUrl("");
                      setSelectedImage(null);
                      setAnalysis(null);
                    }}
                    className="absolute top-2 right-2 p-1 bg-white rounded-full shadow-md hover:bg-gray-100 transition-colors"
                  >
                    <AlertCircle className="w-5 h-5 text-gray-600" />
                  </button>
                </div>
              )}
              <input
                type="file"
                id="image-upload"
                className="hidden"
                accept="image/*"
                onChange={handleImageUpload}
              />
            </div>

            <button
              onClick={analyzeImage}
              disabled={!selectedImage || loading}
              className={`mt-6 w-full flex items-center justify-center gap-2 py-3 px-4 rounded-lg text-white transition-all ${
                !selectedImage || loading
                  ? "bg-gray-400 cursor-not-allowed"
                  : "bg-blue-600 hover:bg-blue-700"
              }`}
            >
              {loading ? (
                <>
                  <Loader2 className="w-5 h-5 animate-spin" />
                  <span>Analyzing...</span>
                </>
              ) : (
                <>
                  <Zap className="w-5 h-5" />
                  <span>Analyze E-waste</span>
                </>
              )}
            </button>
          </div>

          {/* Analysis Results */}
          <div className="bg-white rounded-xl shadow-lg p-6">
            <h2 className="text-xl font-semibold text-gray-900 mb-4">
              Analysis Results
            </h2>

            {!analysis && !loading && (
              <div className="flex flex-col items-center justify-center h-[400px] text-gray-500">
                <Zap className="w-12 h-12 mb-4" />
                <p>Upload an image to see the analysis results</p>
              </div>
            )}

            {loading && (
              <div className="flex flex-col items-center justify-center h-[400px]">
                <Loader2 className="w-12 h-12 text-blue-500 animate-spin mb-4" />
                <p className="text-gray-600">Analyzing your e-waste...</p>
              </div>
            )}

            {analysis && (
              <div className="space-y-6">
                <div className="grid grid-cols-2 gap-4">
                  <div className="bg-gray-50 p-4 rounded-lg">
                    <p className="text-sm text-gray-500 mb-1">Type</p>
                    <p className="font-medium text-gray-900">{analysis.type}</p>
                  </div>

                  <div className="bg-gray-50 p-4 rounded-lg">
                    <p className="text-sm text-gray-500 mb-1">Recyclability</p>
                    <div className="flex items-center gap-2">
                      <Recycle className="w-5 h-5 text-green-500" />
                      <span className="font-medium text-gray-900">
                        {analysis.recyclability}
                      </span>
                    </div>
                  </div>

                  <div className="bg-gray-50 p-4 rounded-lg">
                    <p className="text-sm text-gray-500 mb-1">
                      Hazardous Level
                    </p>
                    <div className="flex items-center gap-2">
                      <AlertTriangle className="w-5 h-5 text-yellow-500" />
                      <span className="font-medium text-gray-900">
                        {analysis.hazardousLevel}
                      </span>
                    </div>
                  </div>

                  <div className="bg-gray-50 p-4 rounded-lg">
                    <p className="text-sm text-gray-500 mb-1">
                      Estimated Value
                    </p>
                    <p className="font-medium text-gray-900">
                      {analysis.estimatedValue}
                    </p>
                  </div>
                </div>

                <div className="bg-gray-50 p-4 rounded-lg">
                  <p className="text-sm text-gray-500 mb-2">
                    Components Detected
                  </p>
                  <div className="flex flex-wrap gap-2">
                    {analysis.components.map((component, index) => (
                      <span
                        key={index}
                        className="px-3 py-1 bg-blue-100 text-blue-800 rounded-full text-sm"
                      >
                        {component}
                      </span>
                    ))}
                  </div>
                </div>

                <div className="bg-gray-50 p-4 rounded-lg">
                  <p className="text-sm text-gray-500 mb-2">Recycling Steps</p>
                  <ol className="list-decimal list-inside space-y-1">
                    {analysis.recyclingSteps.map((step, index) => (
                      <li key={index} className="text-gray-700">
                        {step}
                      </li>
                    ))}
                  </ol>
                </div>

                <div className="mt-6 p-4 bg-green-50 border border-green-200 rounded-lg">
                  <p className="text-sm font-medium text-green-800">
                    Recommended Disposal
                  </p>
                  <p className="mt-1 text-green-700">
                    {analysis.recommendedDisposal}
                  </p>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default AnalyseEwaste;
