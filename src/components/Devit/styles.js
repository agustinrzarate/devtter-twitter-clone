import styled from "styled-components"

export const Container = styled.div``


export const FooterDevit = styled.div`
  display: flex;
  width: 100%;
  min-height: 30px;
  border-bottom: 1px solid #eaf7ff;
  align-items: center;
  justify-content: space-around;
`

export const DevitStyle = styled.article`

  display: flex;
  align-items: top;
  padding: 10px 15px 10px 18px;
  transition: 0.3s ease;
`
export const Section = styled.section`
  margin-left: 12px;
  p {
    margin: 0;
    margin-top: 3px;
    line-height: 1.3125;
  }
`
export const HeaderDevit = styled.div`
  display: flex;
  align-items: flex-end;
  span {
    margin: 0 6px;
  }
  a {
    text-decoration: none;
    color: #555;
    font-size: 14px;
    &:hover {
      text-decoration: underline;
    }
  }
`

export const Img = styled.img`
  border-radius: 10px;
  border: 1px solid #f2f2f2 !important ;
  object-fit: cover;
  max-height: 200px;
`

export const ContainerImg = styled.div`
  max-width: 220px;
  max-height: 200px;
  margin-top: 10px;
`
