import { Button } from 'antd'
import React, { useEffect, useState } from 'react'
//react预览pdf文件插件
import PDF from 'react-pdf-js'
import jianli from './jianli.pdf'
import test from './test.pdf'
import './style.less'

interface PDFType {
  PDFStream: any
}

const PDFViewer = (props: PDFType) => {
  const { PDFStream } = props

  const [page, setPage] = useState<number>(1)
  const [pages, setPages] = useState<number>(1)
  const [isReady, setIsReady] = useState<boolean>(false)

  //获取所有页
  const onDocumentComplete = (pages) => {
    setPages(pages)
  }
  //点击上一页
  const handlePrevious = () => {
    setPage(page - 1)
  }
  //点击下一页
  const handleNext = () => {
    setPage(page + 1)
  }

  useEffect(() => {
    if (PDFStream !== null && PDFStream) {
      console.log('base64', PDFStream)
      setIsReady(true)
    }
  }, [PDFStream])

  return (
    <div className="flieContent">
      <div className="filePdf">
        {isReady ? (
          <PDF
            file={test} //文件地址
            onDocumentComplete={onDocumentComplete}
            page={page} //文件页码
          />
        ) : (
          <PDF
            file={PDFStream} //文件地址
            onDocumentComplete={onDocumentComplete}
            page={page} //文件页码
          />
        )}
      </div>

      <div className="filePdfFooter">
        {page === 1 ? null : (
          <Button type="primary" onClick={handlePrevious}>
            上一页
          </Button>
        )}

        <div className="filePdfPage">
          <span>第{page}页</span>/<span>共{pages}页</span>
        </div>
        {page === pages ? null : (
          <Button style={{ marginLeft: '10px' }} type="primary" onClick={handleNext}>
            下一页
          </Button>
        )}
      </div>
    </div>
  )
}
export default PDFViewer
