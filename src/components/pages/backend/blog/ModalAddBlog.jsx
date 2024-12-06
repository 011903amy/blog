import React from "react";
import { ImagePlusIcon, X } from "lucide-react";
import { Form, Formik } from "formik";
import * as Yup from "Yup";
import { StoreContext } from "@/components/store/StoreContext";
import { setIsAdd } from "@/components/store/StoreAction";
import SpinnerButton from "../partials/spinners/SpinnerButton";
import ModalWrapper from "../partials/modals/ModalWrapper";
import {  InputPhotoUpload, InputSelect, InputText, InputTextArea } from "@/components/helpers/FormInputs";
import useUploadPhoto from "@/components/custom-hook/useUploadPhoto";
import { imgPath } from "@/components/helpers/functions-general";
import { useMutation, useQueryClient } from "@tanstack/react-query";

const ModalAddBlog = ({itemEdit}) => {
  const { dispatch } = React.useContext(StoreContext);
  const { uploadPhoto, handleChangePhoto, photo } =   useUploadPhoto("/v2/upload-photo");

  const handleClose = () => {
    dispatch(setIsAdd(false));
  };

  const queryClient = useQueryClient();
  const mutation = useMutation({
    mutationFn: (values) =>
      queryData(
        itemEdit ? `/v2/blog/${itemEdit.blog_aid}` : `/v2/blog`,
        itemEdit ? "put" : "post",
        values
      ),
    onSuccess: (data) => {
      // Invalidate and refetch
      queryClient.invalidateQueries({
        queryKey: ["blog"],
      });


      // show error box
      if (data.success) {
        dispatch(setIsAdd(false));
        dispatch(setSuccess(true));
      } else {
        dispatch(setValidate(true));
        dispatch(setMessage(data.error));
      }
    },
  });

  console.log(handleChangePhoto)

  const initVal = {
   blog_title: itemEdit ? itemEdit.blog_title : "",
   blog_excerpt: itemEdit ? itemEdit.blog_excerpt : "",
   blog_price: itemEdit ? itemEdit.blog_price : "",
   blog_category: itemEdit ? itemEdit.blog_category : "",
   blog_published_date: itemEdit ? itemEdit.blog_published_date : "",
   blog_reading_time: itemEdit ? itemEdit.blog_reading_time : "",
   blog_author: itemEdit ? itemEdit.blog_author : "",
   blog_author_information: itemEdit ? itemEdit.blog_author_information : "",
   blog_content: itemEdit ? itemEdit.blog_content : "",
   
    
  };
  const yupSchema = Yup.object({
   blog_title: Yup.string().required("Required"),
   blog_excerpt: Yup.string().required("Required"),
   blog_price: Yup.string().required("Required"),
   blog_category: Yup.string().required("Required"),
   blog_published_date: Yup.string().required("Required"),
   blog_reading_time: Yup.string().required("Required"),
   blog_author: Yup.string().required("Required"),
   blog_author_information: Yup.string().required("Required"),
   blog_content: Yup.string().required("Required"),
    
  });

  return (
    <>
      <ModalWrapper>
        <div className="modal-side absolute top-0 right-0 bg-primary h-[100dvh] w-[500px] border-l border-line">
          <div className="modal-header p-4 flex justify-between items-center">
            <h5 className="mb-0">Add Blog</h5>
            <button onClick={handleClose}>
              <X />
            </button>
          </div>

          <Formik
            initialValues={initVal}
            validationSchema={yupSchema}
            onSubmit={async (values) => {
              mutation.mutate({
                ...values,
                blog_image:
                  (itemEdit?.blog_image === "" && photo) ||
                  (!photo && "") ||
                  (photo === undefined && "") ||
                  (photo && itemEdit?.blog_image !== photo?.name)
                    ? photo?.name || ""
                    : itemEdit?.blog_image || "",
              });
              uploadPhoto();
            }}
          >
            {(props) => {
              return (
                <Form>
                  <div className="modal-form h-full max-h-[calc(100vh-56px)] grid grid-rows-[1fr_auto]">
                    <div className="form-wrapper p-4 max-h-[80vh] h-full overflow-y-auto custom-scroll">

                      <div className="input-wrap relative  group input-photo-wrap h-[150px] ">
                        <label htmlFor="">Photo</label>
                        {itemEdit === null && photo === null ? (
                          <div className="w-full border border-line rounded-md flex justify-center items-center flex-col h-full">
                            <ImagePlusIcon
                              size={50}
                              strokeWidth={1}
                              className="opacity-20 group-hover:opacity-50 transition-opacity"
                            />
                            <small className="opacity-20 group-hover:opacity-50 transition-opacity">
                              Upload Photo
                            </small>
                          </div>

                        ) : (
                          <img
                            src={
                              itemEdit === null
                                ? URL.createObjectURL(photo) // preview
                                : imgPath + "/" + itemEdit?.blog_image // check db
                            }
                            alt="employee photo"
                            className={`group-hover:opacity-30 duration-200 relative object-cover h-full w-full  m-auto ${
                              mutation.isPending
                                ? "opacity-40 pointer-events-none"
                                : ""
                            }`}
                          />
                        )}
                        <InputPhotoUpload
                          name="photo"
                          type="file"
                          id="photo"
                          accept="image/*"
                          title="Upload photo"
                          onChange={(e) => handleChangePhoto(e)}
                          onDrop={(e) => handleChangePhoto(e)}
                          className={`opacity-0 absolute top-0 right-0 bottom-0 left-0 rounded-full  m-auto cursor-pointer w-full h-full 
                            ${
                              mutation.isPending ? "pointer-events-none" : ""
                            }`}
                        />
                      </div>
                     
                   <div className="input-wrap mt-8">
                        <InputText
                          label="Title"
                          type="text"
                          name="blog_title"
                        />
                      </div>
                        <div className="input-wrap">
                        <InputText
                          label="Excerpt"
                          type="text"
                          name="blog_excerpt"
                        />
                      </div>
                      <div className="input-wrap">
                        <InputSelect label="Category" name="blog_category">
                          <option value="" hidden>
                            Select Category
                          </option>
                          <option value="branding">Branding</option>
                          <option value="design">Design Joy</option>
                          <option value="video">Video</option>
                          <option value="Content">Content</option>
                         
                        </InputSelect>
                      </div>

                      <div className="input-wrap">
                        <InputText
                          label="Date"
                          type="date"
                          name="blog_published_date"
                        />
                      </div>
                      <div className="input-wrap">
                        <InputText
                          label="Reading Time"
                          type="text"
                          name="blog_reading_time"
                        />
                      </div>
                      <div className="input-wrap">
                        <InputText
                          label="Author"
                          type="text"
                          name="blog_author"
                        />
                      </div>
                      <div className="input-wrap">
                        <InputTextArea
                          label="Author Information"
                          name="blog_author_information"
                          className="overflow-y-auto custom-scroll p-2 !h-[80px]  outline-none  w-full rounded-md bg-primary text-body border border-line resize-none"
                        />
                      </div>
                      <div className="input-wrap">
                        <h4 className="mb-0">Content</h4>
                        <InputTextArea
                          label="Blog Content"
                          name="blog_content"
                          className="overflow-y-auto custom-scroll p-2 !h-[300px]  outline-none  w-full rounded-md bg-primary text-body border border-line resize-none"
                        />
                      </div>
                    </div>
                    <div className="form-action flex p-4 justify-end gap-3">
                      <button className="btn btn-add" type="submit">
                      {mutation.isPending && <SpinnerButton />}
                      {itemEdit ? "Save" : "Add"}
                      </button>
                      <button
                        className="btn btn-cancel"
                        type="reset"
                        onClick={handleClose}
                      >
                        Cancel
                      </button>
                    </div>
                  </div>
                </Form>
              );
            }}
          </Formik>
        </div>
      </ModalWrapper>
    </>
  );
};

export default ModalAddBlog;
