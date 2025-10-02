const LanguageSelect = () => {
  return (
    <>
      <label className='block mb-2 font-semibold'>Language:</label>
      <select name='language' className='border rounded-lg p-2 w-full mb-6 '>
        <option value='javascript'>JavaScript</option>
        <option value='typescript'>TypeScript</option>
        <option value='python'>Python</option>
        <option value='java'>Java</option>
        <option value='golang'>Golang</option>
        <option value='rust'>Rust</option>
      </select>
    </>
  );
};
export default LanguageSelect;
