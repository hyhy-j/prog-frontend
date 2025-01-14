import styled from 'styled-components';
import Header from '../../components/Header/Header';
import back from '../../assets/images/Back.svg';
import Plus from '../../assets/images/Picture.svg';
import RoundPlus from '../../assets/images/RoundPlus.svg';
import Export from '../../assets/images/Export.svg';
import { useState } from 'react';
import { useEffect } from 'react';
import axios from 'axios';
import { baseURL } from '../../api/baseURL';
import { useParams } from 'react-router-dom';
import { Navigate } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';

const Container = styled.div`
  display: flex;
  flex-direction: column;
`;

const Back = styled.img`
  width: 1.8vw;
  height: 1.8vw;
  margin-top: 3vw;
  margin-bottom: 1vw;
`;

const Register = styled.p`
  color: #fff;
  font-family: Pretendard;
  font-size: 1.4vw;
  font-style: normal;
  font-weight: 400;
  line-height: 1.9vw;
  letter-spacing: -0.7px;
`;

const Share = styled.p`
  color: var(--Font-05_Gray_Disabled, #999);
  font-family: Pretendard;
  font-size: 0.8vw;
  font-style: normal;
  font-weight: 400;
  line-height: 1.2vw;
  letter-spacing: -0.4px;
  margin-bottom: 2.8vw;
`;

const Worry = styled.p`
  color: #fff;
  font-family: Pretendard;
  font-size: 1vw;
  font-style: normal;
  font-weight: 600;
  line-height: 1.4vw;
  letter-spacing: -0.5px;
  margin-bottom: 0.4vw;
`;

const WideContainer = styled.div`
  width: 100%;
  height: auto;
  display: flex;
  padding: 1vw;
  flex-direction: column;
  align-items: flex-start;
  justify-content: flex-start;
  gap: 1.2vw;
  align-self: stretch;
  border-radius: 0.6vw;
  background: #262626;
  margin-bottom: 4vw;
`;

const SmallContainer = styled.div`
  width: 100%;
  height: 12.45vw;
  border-radius: 0.6vw;
  background: #333;
  padding: 1vw;
  display: flex;
  align-items: flex-start;
  justify-content: flex-start;
`;

const BoxContainer = styled.div`
  width: 10.45vw;
  height: 10.45vw;
  background-color: #d9d9d9;
  border-radius: 5px;
`;

const RowContainer = styled.div`
  display: flex;
  flex-direction: row;
  align-items: flex-start;
`;

const ColumnContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: flex-start;
`;

const Nickname = styled.p`
  color: #fff;
  text-align: center;
  font-family: Pretendard;
  font-size: 0.7vw;
  font-style: normal;
  font-weight: 400;
  line-height: 1vw;
  letter-spacing: -0.35px;
`;

const Title = styled.p`
  color: #fff;
  font-family: Pretendard;
  font-size: 0.8vw;
  font-style: normal;
  font-weight: 600;
  line-height: 1.2vw;
  letter-spacing: -0.4px;
  margin-top: '0.4vw';
`;

const InputArea = styled.textarea`
  width: 33.75vw;
  height: 7.65vw;
  color: #fff;
  font-family: Pretendard;
  font-size: 0.75vw;
  font-style: normal;
  font-weight: 400;
  line-height: 1.1vw;
  letter-spacing: -0.375px;
  background: #333;
  resize: none;
  outline: none;
  border: none;
  margin-top: 0.2vw;
`;

const InputContainer = styled.textarea`
  width: 100%;
  height: 14.1vw;
  padding: 0.8vw;
  border-radius: 0.4vw;
  border: 1px solid var(--Font-05_Gray_Disabled, #999);
  flex-direction: column;
  justify-content: center;
  align-items: flex-end;
  gap: 0.5vw;
  color: var(--Font-05_Gray_Disabled, #999);
  background-color: #262626;
  font-family: Pretendard;
  font-size: 0.75vw;
  font-style: normal;
  font-weight: 400;
  line-height: 1.1vw;
  letter-spacing: -0.375px;
  resize: none;
  color: white;
  outline: none;
`;

const ImageBox = styled.div`
  width: 10.45vw;
  height: 10.45vw;
  justify-content: center;
  align-items: center;
  border-radius: 0.4vw;
  background: #7a7a7a;
  display: flex;
`;

const PlusImage = styled.img`
  width: 1.8vw;
  height: 1.8vw;
`;

const NewContainer = styled.div`
  display: flex;
  height: 184px;
  justify-content: center;
  align-items: center;
  align-self: stretch;
  height: 9.2vw;
  border-radius: 0.6vw;
  background: #333;
  margin-bottom: 4vw;
`;

const Add = styled.p`
  color: var(--Font-01_White, #fff);
  font-family: Pretendard;
  font-size: 0.8vw;
  font-style: normal;
  font-weight: 600;
  line-height: 1.2vw;
  letter-spacing: -0.4px;
  text-align: center;
`;
const Pluss = styled.img`
  width: 1.2vw;
  height: 1.2vw;
`;

const CommentContainer = styled.textarea`
  width: 100%;
  height: 35vw;
  display: flex;
  justify-content: center;
  align-items: center;
  align-self: stretch;
  border-radius: 0.4vw;
  border: 1px solid #767676;
  background: #262626;
  color: var(--Font-05_Gray_Disabled, #999);
  font-family: Pretendard;
  font-size: 0.75vw;
  font-style: normal;
  font-weight: 400;
  line-height: 1.1vw;
  letter-spacing: -0.375px;
  padding: 1vw;
  resize: none;
  outline: none;
`;

const SendBtn = styled.button`
  width: 30.5vw;
  padding: 0.8vw 0;
  display: flex;
  justify-content: center;
  align-items: center;
  border-radius: 0.4vw;
  background: #00c13a;
  box-shadow: 0px 0px 12px 0px rgba(255, 255, 255, 0.1);
  color: var(--Font-01_White, #fff);
  font-family: Pretendard;
  font-size: 0.8vw;
  font-style: normal;
  font-weight: 600;
  line-height: 1.2vw;
  letter-spacing: -0.4px;
`;

const ButtonContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  margin-top: 6vw;
  margin-bottom: 2vw;
`;

const ExportImage = styled.img`
  width: 1.2vw;
  height: 1.2vw;
  margin-right: 0.4vw;
`;

const ImageContainer = styled.div`
  display: flex;
  gap: 1vw;
  flex-wrap: wrap;
`;

const ImagePreview = styled.img`
  width: 100%;
  height: 100%;
  object-fit: cover;
`;

const FileInput = styled.input`
  display: none;
`;

function FeedbackWrite() {
  const [errorSections, setErrorSections] = useState([
    { id: 0, images: [], description: '', discussionId: '' },
  ]);
  const [feedbackItems, setFeedbackItems] = useState([]);
  const { project_id } = useParams();
  const navigate = useNavigate();

  const handleAddImage = (sectionId, e) => {
    const file = e.target.files[0];
    if (file) {
      const newImage = { file, preview: URL.createObjectURL(file) };
      setErrorSections((prev) =>
        prev.map((section) =>
          section.id === sectionId
            ? { ...section, images: [...section.images, newImage] }
            : section
        )
      );
    }
  };

  useEffect(() => {
    const fetchFeedbackItems = async () => {
      try {
        const response = await axios.get(
          `${baseURL}/api/project_detail/${project_id}/discussion`
        );
        console.log('Feedback Items:', response.data);
        setFeedbackItems(response.data);
        console.log('Project ID:', project_id);
      } catch (error) {
        console.error('Error fetching feedback items:', error);
      }
    };

    if (project_id) fetchFeedbackItems();
  }, [project_id]);

  const handleDescriptionChange = (sectionId, value) => {
    setErrorSections((prev) =>
      prev.map((section) =>
        section.id === sectionId ? { ...section, description: value } : section
      )
    );
  };

  const handleSubmit = async () => {
    try {
      const token = localStorage.getItem('access');
      for (const section of errorSections) {
        const formData = new FormData();
        formData.append('feedback_description', section.description || '');
        section.images.forEach((image) => {
          formData.append('image', image.file); // 이미지 파일 추가
        });

        const discussionId = section.discussionId || feedbackItems[0]?.id;
        if (!discussionId) {
          alert('Discussion ID가 선택되지 않았습니다!');
          return;
        }
        formData.append('discussion', discussionId);

        for (let pair of formData.entries()) {
          console.log(`${pair[0]}:`, pair[1]);
        }

        await axios.post(
          `${baseURL}/api/project_detail/${project_id}/feedback`,
          formData,
          {
            headers: {
              Authorization: `Bearer ${token}`,
              'Content-Type': 'multipart/form-data',
            },
          }
        );
      }
      alert('피드백이 성공적으로 전송되었습니다!');
      navigate(`/FeedbackList/${project_id}`);
    } catch (error) {
      console.error('Error submitting feedback:', error);
      alert('피드백 전송 중 오류가 발생했습니다.');
    }
  };

  useEffect(() => {
    return () => {
      errorSections.forEach((section) => {
        section.images.forEach((image) => URL.revokeObjectURL(image.preview));
      });
    };
  }, [errorSections]);

  return (
    <>
      <Container>
        <Header />
        <Back src={back} />
        <Register>프로젝트 피드백 보내기</Register>
        <Share>
          더 나은 프로젝트가 되기 위해 피드백을 보내고 채택되어 포인트도
          받아보세요!
        </Share>

        <Worry>프로젝트 고민 부분</Worry>
        <WideContainer>
          {feedbackItems.map((item, index) => (
            <SmallContainer key={index}>
              <RowContainer style={{ gap: '1.6vw' }}>
                <BoxContainer>
                  {item.images && item.images.length > 0 ? (
                    <img
                      src={`${baseURL}${item.images[0]}`}
                      alt="Discussion Thumbnail"
                      onLoad={(e) => {
                        e.target.style.opacity = 1;
                      }}
                      onError={(e) => {
                        if (!e.target.dataset.errorHandled) {
                          e.target.dataset.errorHandled = true;
                          e.target.src = '/default-image.png';
                        }
                      }}
                      style={{
                        width: '100%',
                        height: '100%',
                        objectFit: 'cover',
                        borderRadius: '5px',
                        transition: 'opacity 0.3s ease-in-out',
                        opacity: 0,
                      }}
                    />
                  ) : (
                    <span style={{ color: '#999' }}>이미지 없음</span>
                  )}
                </BoxContainer>

                <ColumnContainer>
                  <Nickname>
                    {item.discussion_writer.nickname} |{' '}
                    {item.discussion_writer.role}
                  </Nickname>
                  <Title>{item.title}</Title>
                  <Title style={{ marginTop: '0.5vw' }}>
                    {item.description}
                  </Title>
                </ColumnContainer>
              </RowContainer>
            </SmallContainer>
          ))}
        </WideContainer>

        <Worry>프로젝트 이슈(오류) 부분</Worry>
        {errorSections.map((section) => (
          <WideContainer key={section.id} style={{ marginBottom: '2vw' }}>
            <InputContainer
              placeholder="이슈 부분 설명"
              value={section.description || ''}
              onChange={(e) =>
                handleDescriptionChange(section.id, e.target.value)
              }
            />
            <ImageContainer>
              {section.images.map((image, index) => (
                <ImageBox key={index}>
                  <ImagePreview
                    src={image.preview}
                    alt={`Selected ${index + 1}`}
                  />
                </ImageBox>
              ))}
              <ImageBox>
                <FileInput
                  id={`fileInput-${section.id}`}
                  type="file"
                  accept="image/*"
                  onChange={(e) => handleAddImage(section.id, e)}
                />
                <PlusImage
                  src={Plus}
                  alt="Add Image"
                  onClick={() =>
                    document.getElementById(`fileInput-${section.id}`).click()
                  }
                />
              </ImageBox>
            </ImageContainer>
          </WideContainer>
        ))}

        <ButtonContainer>
          <SendBtn onClick={handleSubmit}>
            <ExportImage src={Export} />
            피드백 보내기
          </SendBtn>
        </ButtonContainer>
      </Container>
    </>
  );
}

export default FeedbackWrite;
