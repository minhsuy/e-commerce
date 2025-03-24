import React from 'react';
import { Editor } from '@tinymce/tinymce-react';
import PropTypes from 'prop-types'
const MarkdownEditor = ({ label, value, name, changeValue, invalidFields, setInvalidFields, setEditMarkdown }) => {
    return (
        <div className='flex flex-col '>
            <span className='inline-block mb-4 font-semibold'>{label}</span>
            <div className='border border-gray-300'>
                <Editor
                    apiKey='ox2i4ag3cmm97n826f5eo9joriytzho3w1axxucno0kpevzp'
                    init={{
                        plugins: [
                            'anchor', 'autolink', 'charmap', 'codesample', 'emoticons', 'image', 'link', 'lists', 'media', 'searchreplace', 'table', 'visualblocks', 'wordcount',
                            'checklist', 'mediaembed', 'casechange', 'export', 'formatpainter', 'pageembed', 'a11ychecker', 'tinymcespellchecker', 'permanentpen', 'powerpaste', 'advtable', 'advcode', 'editimage', 'advtemplate', 'ai', 'mentions', 'tinycomments', 'tableofcontents', 'footnotes', 'mergetags', 'autocorrect', 'typography', 'inlinecss', 'markdown', 'importword', 'exportword', 'exportpdf'
                        ],
                        toolbar: 'undo redo | blocks fontfamily fontsize | bold italic underline strikethrough | link image media table mergetags | addcomment showcomments | spellcheckdialog a11ycheck typography | align lineheight | checklist numlist bullist indent outdent | emoticons charmap | removeformat',
                        tinycomments_mode: 'embedded',
                        tinycomments_author: 'Author name',
                        mergetags_list: [
                            { value: 'First.Name', title: 'First Name' },
                            { value: 'Email', title: 'Email' },
                        ],
                        ai_request: (request, respondWith) => respondWith.string(() => Promise.reject('See docs to implement AI Assistant')),
                    }}
                    initialValue={value}
                    onChange={(e) => changeValue((prev) => ({ ...prev, [name]: e.target.getContent() }))}
                    onFocus={() => setEditMarkdown(true)}
                    onBlur={() => setEditMarkdown(false)}
                />
            </div>
            {invalidFields && invalidFields.map((item, index) => item.name === name && <span key={index} className='text-red-600'>{item.message}</span>)}
        </div>

    );
}
MarkdownEditor.propTypes = {
    label: PropTypes.string,
    value: PropTypes.string,
    name: PropTypes.string,
    changeValue: PropTypes.any,
    setInvalidFields: PropTypes.any,
    invalidFields: PropTypes.any,
    setEditMarkdown: PropTypes.any,
}
export default MarkdownEditor; 