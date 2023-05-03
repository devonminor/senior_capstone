import { useEffect } from 'react';
// **********************************************************************
// upload widget:
// https://support.cloudinary.com/hc/en-us/articles/360020451819-How-to-integrate-the-Upload-Widget-in-your-React-app-
// upload widget further documentation:
// https://cloudinary.com/documentation/upload_widget
// https://codesandbox.io/s/nextjs-simple-upload-file-to-server-thyb0
// **********************************************************************

const CloudinaryUploadWidget = () => {
    useEffect(() => {
        const myWidget = window.cloudinary.createUploadWidget(
            {
                cloudName: 'dzayk2ulr',
                uploadPreset: 'upload_image',
            },
            (error: any, result: any) => {
                if (!error && result && result.event === 'success') {
                    console.log('Done! Here is the image info: ', result.info);
                }
            }
        );
        document
            .getElementById('upload_widget')!
            .addEventListener('click', function () {
                myWidget.open();
            });
    }, []);

    return (
        <button id='upload_widget' className='cloudinary-button'>
            Upload
        </button>
    );
};

export default CloudinaryUploadWidget;
