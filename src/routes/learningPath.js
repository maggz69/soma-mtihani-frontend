import LearningPathHome from '@/pages/learningPath/LearningPathHome.vue'
import LearningPathLayout from '@/pages/learningPath/LearningPathLayout.vue'
import CreateQuestion from '@/pages/learningPath/questions/CreateQuestion.vue'
import AuthenticatedLayout from '@/layouts/AuthenticatedLayout.vue'
import ListExamination from '@/pages/learningPath/examinations/ListExamination.vue'
import CreateExamination from '@/pages/learningPath/examinations/CreateExamination.vue'
import ViewExamination from '@/pages/learningPath/examinations/View/ViewExamination.vue'
import ViewExaminationLayoutVue from '@/pages/learningPath/examinations/View/ViewExaminationLayout.vue'
import ExaminationStats from '@/pages/learningPath/examinations/View/Components/ExaminationStats.vue'
import CreateQuestionForExamination from '@/pages/learningPath/questions/components/CreateQuestionForExamination.vue'

const learningPathRoutes = [
    {
        path: '/learning-path', component: LearningPathLayout, name: 'learning-path', children: [
            { path: '', component: LearningPathHome, name: 'learning-path-home' },
            {
                path: 'questions', component: AuthenticatedLayout, children: [
                    { path: 'create', component: CreateQuestion, name: 'create-question' },
                ], name: 'questions'
            },
            {
                path: 'examinations', component: AuthenticatedLayout, 'children': [
                    { path: '', component: ListExamination, name: 'list-examinations' },
                    { path: 'create', component: CreateExamination, name: 'create-examination' },
                    {
                        path: 'view/:id', component: ViewExaminationLayoutVue, children: [
                            {
                                path: '', components: {
                                    'page-top': ViewExamination,
                                    'tab-selected': ExaminationStats
                                },
                                name: 'view-examination-stats'
                            },
                            {
                                path: 'questions', components: {
                                    'page-top': ViewExamination,
                                    'tab-selected': CreateQuestionForExamination
                                },
                                name: 'view-examination-questions'
                            },
                            {
                                path: 'usage', components: {
                                    'page-top': ViewExamination,
                                    'tab-selected': ExaminationStats
                                },
                                name: 'view-examination-usage'
                            }
                        ]
                    }
                ]
            }
        ]
    },
]

export default learningPathRoutes