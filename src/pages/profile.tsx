import React from 'react';
import { Formik, Form, Field } from 'formik';
import useSWR, { mutate } from 'swr';
import axios from 'axios';
import Main from '@/layout/mainLayout';

const fetcher = (url: string) => axios.get(url).then(res => res.data);

const ProfilePage: React.FC = () => {
  const { data, error } = useSWR('/api/user', fetcher);

  if (error) return <div>Error loading user data</div>;
  if (!data) return <div>Loading...</div>;

  const { id, name, email, bio, post } = data; 
  return (
    <Main>
      <div className='w-full md:w-1/2 mx-auto p-4'>
        <h1 className="text-4xl font-bold mb-6">Profile</h1>
        <Formik
          initialValues={{ id, name, email, bio, post }}
          onSubmit={(values, actions) => {
            axios.put('/api/user', values)
              .then(res => {
                mutate('/api/user', values, false);
                console.log('Profile updated successfully');
              })
              .catch(err => {
                console.error('Error updating profile:', err);
              })
              .finally(() => {
                actions.setSubmitting(false);
              });
          }}
        >
          {({ isSubmitting }) => (
            <Form className="space-y-6">
              <div>
                <label htmlFor="name" className="block text-sm font-medium text-gray-300">Name</label>
                <Field
                  name="name"
                  type="text"
                  className=" bg-gray-800 border text-white"
                />
              </div>
              <div>
                <label htmlFor="email" className="block text-sm font-medium text-gray-300">Email</label>
                <Field
                  name="email"
                  type="email"
                  className="mt-1 p-2 block w-full bg-gray-800 border border-gray-600 rounded text-white"
                />
              </div>
              <div>
                <label htmlFor="bio" className="block text-sm font-medium text-gray-300">Bio</label>
                <Field
                  name="bio"
                  as="textarea"
                  rows={3}
                  className="mt-1 p-2 block w-full bg-gray-800 border border-gray-600 rounded text-white"
                />
              </div>
              <div>
                <button
                  type="submit"
                  className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
                  disabled={isSubmitting}
                >
                  Save
                </button>
              </div>
            </Form>
          )}
        </Formik>
      </div>
    </Main>
  );
}

export default ProfilePage;
