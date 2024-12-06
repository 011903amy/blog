import { Plus } from 'lucide-react'
import React from 'react'
import { setIsAdd } from '@/components/store/StoreAction'
import { StoreContext } from '@/components/store/StoreContext'
import Footer from '../partials/Footer'
import Header from '../partials/Header'
import ModalError from '../partials/modals/ModalError'
import ModalValidation from '../partials/modals/ModalValidation'
import SearchBar from '../partials/SearchBar'
import SideNavigation from '../partials/SideNavigation'
import ToastSuccess from '../partials/ToastSuccess'
import BlogTable from './BlogTable'
import ModalAddBlog from './ModalAddBlog'

const Blog = () => {
  const { dispatch, store } = React.useContext(StoreContext);
  const [itemEdit, setItemEdit] = React.useState(null);
  const handleAdd = () => {
    dispatch(setIsAdd(true));
    setItemEdit(null)
  };
  return (
    <>
      <section className="layout-main">
        <div className="layout-division">
          <SideNavigation menu="blog" />
          <main>
            <Header title="Blog" subtitle='Blog System' />
            <div className="p-8">
              <div className="flex justify-between items-center">
                <SearchBar />
                <button className="btn btn-add" onClick={handleAdd}>
                  <Plus size={16} />
                  Add New
                </button>
              </div>

              <BlogTable setItemEdit={setItemEdit}/>
            </div>

            <Footer />
          </main>
        </div>
      </section>
      {store.isAdd && <ModalAddBlog itemEdit={itemEdit} />}
      {store.isValidate && <ModalValidation />}
      {store.error && <ModalError />}
      {store.isSuccess && <ToastSuccess />}
    </>
  )
}

export default Blog