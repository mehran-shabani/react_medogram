import React, { useState } from 'react';

const AddCommentForm = ({ onCommentSubmit }) => {
    const [comment, setComment] = useState('');

    const handleSubmit = (e) => {
        e.preventDefault();

        if (comment.trim()) {
            onCommentSubmit({ comment });
            setComment('');  // ریست کردن فرم پس از ارسال
        }
    };

    return (
        <form onSubmit={handleSubmit}>
            <div>
        <textarea
            value={comment}
            onChange={(e) => setComment(e.target.value)}
            placeholder="Add a comment"
        />
            </div>
            <button type="submit">Submit Comment</button>
        </form>
    );
};

export default AddCommentForm;
