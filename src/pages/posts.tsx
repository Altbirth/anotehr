"use client";

import React from 'react';
import { Formik, Form, Field, FieldArray } from 'formik';
import useSWR, { mutate } from 'swr';
import axios from 'axios';
import Main from '@/layout/mainLayout';
import { AiOutlineDelete } from 'react-icons/ai';

const fetcher = (url: string) => axios.get(url).then(res => res.data);

interface Post {
  title: string;
  content: string;
  date: string;
}

interface User {
  id: number;
  name: string;
  email: string;
  bio: string;
  post: Post[];
}

const formatDate = (date: Date) => {
  const padTo2Digits = (num: number) => num.toString().padStart(2, '0');

  const month = padTo2Digits(date.getMonth() + 1);
  const day = padTo2Digits(date.getDate());
  const year = date.getFullYear();
  const hours = padTo2Digits(date.getHours());
  const minutes = padTo2Digits(date.getMinutes());

  return `${month}/${day}/${year} - ${hours}:${minutes}`;
};

const ProfilePage: React.FC = () => {
  const { data, error } = useSWR<User>('/api/user', fetcher);

  if (error) return <div>Error loading user data</div>;
  if (!data) return <div>Loading...</div>;

  return (
    <Main>
      <div className='w-full md:w-1/2 mx-auto p-4'>
        <h1 className="text-4xl font-bold mb-6">Notes</h1>
        <Formik
          initialValues={{ posts: data.post }}
          onSubmit={(values, actions) => {
            axios.put('/api/user', { ...data, post: values.posts })
              .then(res => {
                mutate('/api/user', { ...data, post: values.posts }, false);
                console.log('Posts updated successfully');
              })
              .catch(err => {
                console.error('Error updating posts:', err);
              })
              .finally(() => {
                actions.setSubmitting(false);
              });
          }}
        >
          {({ values, isSubmitting }) => (
            <Form className="space-y-6">
              <FieldArray name="posts">
                {({ push, remove }) => (
                  <div className="space-y-4">
                    {values.posts.map((post, index) => (
                      <div key={index} className="flex items-center space-x-4">
                        <Field
                          name={`posts.${index}.title`}
                          placeholder="Title"
                          className="w-1/3 p-2 bg-gray-800 text-white border border-gray-700 rounded"
                        />
                        <Field
                          name={`posts.${index}.content`}
                          placeholder="Content"
                          className="w-2/3 p-2 bg-gray-800 text-white border border-gray-700 rounded"
                        />
                        <button
                          type="button"
                          onClick={() => remove(index)}
                          className="text-red-500 hover:text-red-700"
                        >
                          <AiOutlineDelete size={24} />
                        </button>
                      </div>
                    ))}
                    <button
                      type="button"
                      onClick={() => push({ title: '', content: '', date: formatDate(new Date()) })}
                      className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
                    >
                      Add Post
                    </button>
                  </div>
                )}
              </FieldArray>
              <button
                type="submit"
                className="px-4 py-2 bg-green-500 text-white rounded hover:bg-green-600"
                disabled={isSubmitting}
              >
                Save
              </button>
            </Form>
          )}
        </Formik>
      </div>
    </Main>
  );
}

export default ProfilePage;
