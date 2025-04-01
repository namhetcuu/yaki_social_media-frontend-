const cloud_name = "dbzbiehgq";
const upload_preset = "yakinasu";

export const uploadToCloudinary = async (pics, fileType) => {
    try {
        if (!pics || !fileType) {
            console.error("File hoặc loại file không hợp lệ");
            return null;
        }

        const data = new FormData();
        data.append("file", pics);
        data.append("upload_preset", upload_preset);
        //data.append("cloud_name", cloud_name);

        console.log("Uploading file:", pics);
        console.log("File Type:", fileType);
        console.log("FormData:", [...data.entries()]);

        const res = await fetch(`https://api.cloudinary.com/v1_1/${cloud_name}/${fileType}/upload`, {
            method: "POST",
            body: data,
        });

        if (!res.ok) {
            const errorResponse = await res.json();
            console.error("Lỗi Cloudinary:", errorResponse);
            return null;
        }

        const fileData = await res.json();
        console.log("Upload thành công:", fileData);
        return fileData.secure_url;
    } catch (error) {
        console.error("Lỗi upload:", error);
        return null;
    }
};
