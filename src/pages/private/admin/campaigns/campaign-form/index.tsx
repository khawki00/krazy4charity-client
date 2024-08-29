import {useEffect, useState} from 'react'
import PageTitle from '../../../../../components/page-title';
import { useNavigate, useParams } from 'react-router-dom';
import { Button, Form, Input, message, Select, Upload } from 'antd';
import { uploadFilesToFirebaseAndReturnUrls } from '../../../../../helpers/uploads';
import axios from 'axios';

function CampaignForm() {
    const params = useParams();
    const [selectedImageFiles, setSelectedImageFiles] = useState<any|null>([]);
    const [campaignData, setCampaignData] = useState<any | null>(null);
    const [uploadedImages, setUploadedImages] = useState<any | null>(null);
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();

    const onFinish = async (values: any) => {
        try {
            setLoading(true);
            const newImages = await uploadFilesToFirebaseAndReturnUrls(selectedImageFiles);
            values.images = [...uploadedImages || [], ...newImages];
            if(!params.id){
                await axios.post("/api/campaigns/create", values);
                message.success("Campaign created successfully");
            }else{
                await axios.put(`/api/campaigns/update/${params.id}`, values);
                message.success("Campaign updated successfully");
            }
           
           
            navigate(-1);
        } catch (error:any) {
            message.error(error.message);
        }finally{
            setLoading(false);
        }
    };

    const getCampaignData = async() =>{
        try{
          const response = await axios.get(`/api/campaigns/get/${params.id}`);
          setCampaignData(response.data);
          setUploadedImages(response.data.images);
        }catch(error:any){
            message.error(error.message);
        }
    }

    useEffect(() => {
        if(params.id){
            getCampaignData();
        }
    },[]);

    let showForm = false;

    if(!params.id){
        showForm = true
    }
    if(params.id && campaignData){
        showForm = true
    }
  return (
    <div>
        <PageTitle title={params.id ? "Edit Campaign" : "Create Campaign"}/>

      {showForm && (<Form layout="vertical" className='mt-5' onFinish={onFinish} initialValues={campaignData}>
            <Form.Item name='name' label='Name' required>
                <Input/>
            </Form.Item>
            <Form.Item name='description' label='Descripton' required>
                <Input.TextArea/>
            </Form.Item>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
                <Form.Item name='organizer' label='Organizer'required>
                    <Input/>
                </Form.Item>
                <Form.Item name='targetAmount' label='Target Amount' required>
                    <Input/>
                </Form.Item>
                <Form.Item name='category' label='Category' required>
                    <Select>
                        <Select.Option value='education'>Education </Select.Option>
                        <Select.Option value='sports'>Sports</Select.Option>
                        <Select.Option value='fieldtrip'>Field Trips</Select.Option>
                        <Select.Option value='clubs'>Clubs</Select.Option>
                    </Select>
                </Form.Item>
                <Form.Item name='startDate' label='Start Date' required>
                    <Input type='date'/>
                </Form.Item>
                <Form.Item name='endDate' label='End Date' required>
                    <Input type='date'/>
                </Form.Item>
                <Form.Item name='isActive' label='Is Active' required>
                    <Select>
                        <Select.Option value={true}>Yes</Select.Option>
                        <Select.Option value={false}>No</Select.Option>
                    </Select>
                </Form.Item>
              <div className="flex gap-5">
                {uploadedImages?.map((image : any, index:number) => (
                    <div className="flex flex-col gap-2 border rounded items-center justify-center bg-white">
                    <img src={image} alt="campaign image" className="w-20 h-20 rounded"/>
                    <span className="text-sm cursor-pointer underline" onClick={() => {setUploadedImages((prev:any)=>
                        prev.filter((_item:any, i:number) => i !== index))}}>
                        Delete
                    </span>
                    </div>
                ))}
                  

              <Form.Item name="images" label="Images" required>
                    <Upload listType='picture-card'
                     beforeUpload={(file:any)=>{
                        setSelectedImageFiles((prev:any)=>[...prev,file]);
                        return false;
                     }}
                      fileList={selectedImageFiles.map((file:any)=>({
                        ...file,
                        url: URL.createObjectURL(file),
                      }))}
                      onRemove={((file:any) => {
                        setSelectedImageFiles((prev:any)=>
                         prev.filter((item:any)=> item.uid !== file.uid))
                      })}
                     >
                        <span className="text-sm">Upload Images</span>
                    </Upload>
                </Form.Item>
              </div>
            </div>
            <div className="flex justify-end gap-5">
                <Button type="primary" onClick={()=>{navigate(-1)}} disabled={loading}>Cancel</Button>
                <Button type="primary" htmlType='submit' loading={loading}>
                    {params.id ? "Update" : "Create"}
                </Button>
            </div>
        </Form>)}
    </div>
  )
}

export default CampaignForm;