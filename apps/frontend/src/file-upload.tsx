import { useForm } from 'react-hook-form'

export default function FileUpload() {
  const { handleSubmit, register } = useForm()
  return (
    <form
      onSubmit={handleSubmit((data) => {
        const formData = new FormData()
        formData.append('text', data.text)
        for (const file of data['files']) formData.append('files', file)

        return fetch('/api/v1/posts', {
          headers: {
            // 'Content-Type': 'multipart/form-data',
            Authorization:
              'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiJkOTQ5NmQ5ZS00NzJhLTQ1NDEtOTUyZS1jOGNkZjA3NzZiY2QiLCJlbWFpbCI6ImJtcTkyOEBnbWFpbC5jb20iLCJpYXQiOjE3MTQ2MjU1Njl9.P5_CJDP-BtooheNMb7dqyTwWzbaVnLS2vN_UrG_q0-s',
          },
          body: formData,
          method: 'POST',
        })
      })}
    >
      <input type="file" multiple {...register('files')} />
      <input type="text" {...register('text')} />
      <button type="submit">Submit</button>
    </form>
  )
}
