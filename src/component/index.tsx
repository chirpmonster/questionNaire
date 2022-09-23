import React, {useState} from 'react';
import {Button, Checkbox, Input} from "antd";
import axios from 'axios'
import './index.css'

const questions = [{
    title: '1. 以下文件命名有误的是',
    question: [
        {value: 'A', label: '某封装的通用函数（非React组件）：Main.js'},
        {value: 'B', label: '某README文件：README.md'},
        {value: 'C', label: '某React组件：Sourcenode.tsx'},
        {value: 'D', label: '某hooks文件：useUpdate.ts'},
    ],
    answer: 'AC',
}, {
    title: '2. 以下文件夹命名最标准的是',
    question: [
        {value: 'A', label: 'CUSTOM-REPORT-PAGE'},
        {value: 'B', label: 'custom-report-page'},
        {value: 'C', label: 'CustomReportPage'},
        {value: 'D', label: 'customReportPage'},
    ],
    answer: 'B',
}, {
    title: '3. 以下为master分支中的commit，不够规范的是',
    question: [
        {value: 'A', label: 'GALAXY-8432 perf 卡片性能调优'},
        {value: 'B', label: 'GALAXY-7706 bug 卡片在布局组件内部不展示默认背景色'},
        {value: 'C', label: 'GALAXY-6702 单线图不设置固定数值轴范围，颜色显示不正常'},
        {value: 'D', label: '雷达图按度量排列后未显示数据标签 fix GALAXY-7050'},
    ],
    answer: 'BCD',
}, {
    title: '4. 当你发现自己发起合并请求时，只有一个commit，并且那个commit不符合"taskId 关键字 task描述"的标准格式时，以下错误的是\n',
    question: [
        {value: 'A', label: '再提交一个正确的commit，然后修改merge request的标题'},
        {value: 'B', label: '修改merge request的标题，合并后发现标题修改未生效，及时群内同步失误，并牢记这个bug，以后在第一次commit时就注意格式'},
        {value: 'C', label: '修改merge request的标题，合并后发现标题修改未生效，但是无所谓，因为我操作没问题，这是gitLab的bug'},
        {value: 'D', label: '不修改merge request的标题，摆烂'},
    ],
    answer: 'CD',
}, {
    title: '5. 以下变量命名有误的是',
    question: [
        {value: 'A', label: 'let isRead = false'},
        {value: 'B', label: 'let center-data = { abc: 1 }'},
        {value: 'C', label: 'const USER_NAME = \'guandata\''},
        {value: 'D', label: 'const SourceList = [{a: 1}, {a: 2}]'},
    ],
    answer: 'BD',
}, {
    title: '6. 以下哪些是不好的代码',
    question: [
        {value: 'A', label: 'var dataset = { a: 1 }'},
        {value: 'B', label: 'if ( a == true ) {}'},
        {value: 'C', label: 'eval(string)'},
        {value: 'D', label: '组件不写IProps'},
    ],
    answer: 'ABCD',
}, {
    title: '7. 以下说法正确的是',
    question: [
        {value: 'A', label: '双斜线注释后，必须跟一个空格'},
        {value: 'B', label: '逻辑比较复杂的代码补充一下注释'},
        {value: 'C', label: 'CSS中每个属性声明末尾都要加分号'},
        {value: 'D', label: 'CSS中url应使用单引号'},
    ],
    answer: 'ABC',
}, {
    title: '8. 关于单测，以下说法正确的是',
    question: [
        {value: 'A', label: '单测可以提高项目的质量，要用在开发前思考这个task的逻辑是否可以使用单测'},
        {value: 'B', label: '单测太耗费时间了，我写的功能虽然复杂，但是逻辑很清晰，不需要写单测'},
        {value: 'C', label: '有一个场景出了线上bug，修复后发现这个场景没有单测并可以通过单测覆盖，抽出时间补上这边的单测'},
        {value: 'D', label: '有复杂逻辑需要写待测，但是task排期较紧，计划后续补上，然后忘了'},
    ],
    answer: 'AC',
}, {
    title: '9. 以下说法正确的是',
    question: [
        {value: 'A', label: '使用工程中配置的eslint来规范代码格式'},
        {value: 'B', label: '按照代码规范开发'},
        {value: 'C', label: '尽量避免大文件（400行），大函数 （200行），尽量避免超过 120 列'},
        {value: 'D', label: '尽量避免重复代码，冗余代码'},
    ],
    answer: 'ABCD',
}, {
    title: '10. 关于jira操作，以下说法正确的是',
    question: [
        {value: 'A', label: '在我名下的task及时跟进'},
        {value: 'B', label: '及时更新task状态'},
        {value: 'C', label: '出现OT，及时处理'},
        {value: 'D', label: '收到钉钉中的"研发任务通知"的推送后及时处理'},
    ],
    answer: 'ABCD',
}, {
    title: '11. 关于代码提交，以下做法正确的是',
    question: [
        {value: 'A', label: '代码合进master分支之前需经过TL或Peer审核'},
        {value: 'B', label: '所有conversation都resolve后才可以合入'},
        {value: 'C', label: 'cherry-pick时遇到代码冲突，不评估影响面，私下处理隐瞒不报'},
        {value: 'D', label: 'commit提交时，发现eslint报错，处理完后再commit'},
    ],
    answer: 'ABD',
}, {
    title: '12. 关于OT最新规范，以下做法正确的是',
    question: [
        {value: 'A', label: '流转时要完整填写备注并检查处理人等信息准确'},
        {value: 'B', label: '1工作日内反馈进度，计时从产研处理中开始到Task出现update时结束'},
        {value: 'C', label: '5个工作日处理完成，计时从最后一次状态变成“产研处理中”开始到最后一次状态变成“待反馈”或者“技术支持处理中”结束'},
        {value: 'D', label: '和相关人员钉钉同步过后，就不用在评论区留言了'},
    ],
    answer: 'AB',
}]

export default function Test() {

    const [answer, setAnswer] = useState([])
    const [step, setStep] = useState(1)
    const [startTime, setStartTime] = useState()
    const [endTime, setEndTime] = useState()
    const [name, setName] = useState()

    if (step === 1) {
        return <div>
            <h1>团队规范、代码规范、开发规范测试题（12题，预计3-5分钟）</h1>
            <div>第一名可报销一次外卖（上线50）</div>
            <div>评分标准：分数优先，同分数则比较做题时间</div>
            <div>注意：时间仅用作排名，不用于计分，且仅有一次机会，请认真做题</div>
            请输入真实姓名：<Input value={name} onChange={(e) => setName(e.target.value)}/>
            <br/>
            <Button onClick={() => {
                setStep(2)
                setStartTime(new Date())
            }}
                    disabled={!name}
            >开始做题（计时开始）</Button>
        </div>
    }
    if (step === 2) {
        return <div>
            {
                questions.map((item, index) => {
                    return <div key={item.title}>
                        <div>{item.title}</div>
                        <Checkbox.Group options={item.question} onChange={(data) => {
                            answer[index] = data
                            setAnswer(answer)
                        }}/>
                    </div>
                })
            }
            <Button onClick={() => {
                console.log(answer)
                setStep(3)
                setEndTime(new Date())
            }}>提交</Button>
        </div>
    }
    if (step === 3) {
        let error = []
        answer.forEach((item, index) => {
            if (item?.join('') !== questions[index].answer) {
                error.push(questions[index])
            }
        })
        let time = endTime - startTime
        axios.get('http://192.168.130.54:9876/answer', {
            params: {
                answer,
                time,
                error,
                name,
                errorLength: error.length,
            }
        })
        return <div>
            <h1>你的得分为{100 - error.length}</h1>
            {error.length && <div>错题为{
                error.map((item, index) => {
                    return <div key={item.title}>
                        <div>{item.title}</div>
                        <Checkbox.Group options={item.question} onChange={(data) => {
                            answer[index] = data
                            setAnswer(answer)
                        }}/>
                        <div>正确答案为:{item.answer}</div>
                    </div>
                })
            }</div>}
            <div>耗时为{time / 1000}s</div>
        </div>
    }
}
