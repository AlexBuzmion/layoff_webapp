import HorizontalBarChart from '@/components/HorizontalBarChart.vue';
import ChartController from '@/components/ChartController.vue';
import RadarChartGroup from '@/components/RadarChartGroup.vue';
import DoughnutChart from '@/components/DoughnutChart.vue';
import ScatterChart from '@/components/ScatterChart.vue';
import { __VLS_internalComponent, __VLS_componentsOption, __VLS_name, playerData } from './ChartsView.vue';

function __VLS_template() {
let __VLS_ctx!: InstanceType<__VLS_PickNotAny<typeof __VLS_internalComponent, new () => {}>> & {};
/* Components */
let __VLS_otherComponents!: NonNullable<typeof __VLS_internalComponent extends { components: infer C; } ? C : {}> & typeof __VLS_componentsOption;
let __VLS_own!: __VLS_SelfComponent<typeof __VLS_name, typeof __VLS_internalComponent & (new () => { $slots: typeof __VLS_slots; })>;
let __VLS_localComponents!: typeof __VLS_otherComponents & Omit<typeof __VLS_own, keyof typeof __VLS_otherComponents>;
let __VLS_components!: typeof __VLS_localComponents & __VLS_GlobalComponents & typeof __VLS_ctx;
/* Style Scoped */
type __VLS_StyleScopedClasses = {} &
{ 'horizontal-bar-chart'?: boolean; } &
{ 'big'?: boolean; };
let __VLS_styleScopedClasses!: __VLS_StyleScopedClasses | keyof __VLS_StyleScopedClasses | (keyof __VLS_StyleScopedClasses)[];
/* CSS variable injection */
/* CSS variable injection end */
let __VLS_resolvedLocalAndGlobalComponents!: {} &
__VLS_WithComponent<'ChartController', typeof __VLS_localComponents, "ChartController", "ChartController", "ChartController"> &
__VLS_WithComponent<'HorizontalBarChart', typeof __VLS_localComponents, "HorizontalBarChart", "HorizontalBarChart", "HorizontalBarChart"> &
__VLS_WithComponent<'RadarChartGroup', typeof __VLS_localComponents, "RadarChartGroup", "RadarChartGroup", "RadarChartGroup"> &
__VLS_WithComponent<'DoughnutChart', typeof __VLS_localComponents, "DoughnutChart", "DoughnutChart", "DoughnutChart"> &
__VLS_WithComponent<'ScatterChart', typeof __VLS_localComponents, "ScatterChart", "ScatterChart", "ScatterChart">;
__VLS_intrinsicElements.div; __VLS_intrinsicElements.div; __VLS_intrinsicElements.div; __VLS_intrinsicElements.div; __VLS_intrinsicElements.div; __VLS_intrinsicElements.div; __VLS_intrinsicElements.div; __VLS_intrinsicElements.div; __VLS_intrinsicElements.div; __VLS_intrinsicElements.div; __VLS_intrinsicElements.div; __VLS_intrinsicElements.div;
__VLS_components.ChartController; __VLS_components.ChartController;
// @ts-ignore
[ChartController, ChartController,];
__VLS_intrinsicElements.h1; __VLS_intrinsicElements.h1; __VLS_intrinsicElements.h1; __VLS_intrinsicElements.h1; __VLS_intrinsicElements.h1; __VLS_intrinsicElements.h1; __VLS_intrinsicElements.h1; __VLS_intrinsicElements.h1;
__VLS_components.HorizontalBarChart;
// @ts-ignore
[HorizontalBarChart,];
__VLS_components.RadarChartGroup; __VLS_components.RadarChartGroup;
// @ts-ignore
[RadarChartGroup, RadarChartGroup,];
__VLS_components.DoughnutChart; __VLS_components.DoughnutChart; __VLS_components.DoughnutChart; __VLS_components.DoughnutChart;
// @ts-ignore
[DoughnutChart, DoughnutChart, DoughnutChart, DoughnutChart,];
__VLS_components.ScatterChart; __VLS_components.ScatterChart;
// @ts-ignore
[ScatterChart, ScatterChart,];
{
const __VLS_0 = __VLS_intrinsicElements["div"];
const __VLS_1 = __VLS_elementAsFunctionalComponent(__VLS_0);
const __VLS_2 = __VLS_1({ ...{}, class: ("chart-info"), }, ...__VLS_functionalComponentArgsRest(__VLS_1));
({} as (props: __VLS_FunctionalComponentProps<typeof __VLS_0, typeof __VLS_2> & Record<string, unknown>) => void)({ ...{}, class: ("chart-info"), });
const __VLS_3 = __VLS_pickFunctionalComponentCtx(__VLS_0, __VLS_2)!;
let __VLS_4!: __VLS_NormalizeEmits<typeof __VLS_3.emit>;
{
const __VLS_5 = ({} as 'ChartController' extends keyof typeof __VLS_ctx ? { 'ChartController': typeof __VLS_ctx.ChartController; } : typeof __VLS_resolvedLocalAndGlobalComponents).ChartController;
const __VLS_6 = __VLS_asFunctionalComponent(__VLS_5, new __VLS_5({ ...{}, class: ("column side"), }));
({} as { ChartController: typeof __VLS_5; }).ChartController;
({} as { ChartController: typeof __VLS_5; }).ChartController;
const __VLS_7 = __VLS_6({ ...{}, class: ("column side"), }, ...__VLS_functionalComponentArgsRest(__VLS_6));
({} as (props: __VLS_FunctionalComponentProps<typeof __VLS_5, typeof __VLS_7> & Record<string, unknown>) => void)({ ...{}, class: ("column side"), });
const __VLS_8 = __VLS_pickFunctionalComponentCtx(__VLS_5, __VLS_7)!;
let __VLS_9!: __VLS_NormalizeEmits<typeof __VLS_8.emit>;
}
{
const __VLS_10 = __VLS_intrinsicElements["h1"];
const __VLS_11 = __VLS_elementAsFunctionalComponent(__VLS_10);
const __VLS_12 = __VLS_11({ ...{}, }, ...__VLS_functionalComponentArgsRest(__VLS_11));
({} as (props: __VLS_FunctionalComponentProps<typeof __VLS_10, typeof __VLS_12> & Record<string, unknown>) => void)({ ...{}, });
const __VLS_13 = __VLS_pickFunctionalComponentCtx(__VLS_10, __VLS_12)!;
let __VLS_14!: __VLS_NormalizeEmits<typeof __VLS_13.emit>;
(__VLS_13.slots!).default;
}
{
const __VLS_15 = __VLS_intrinsicElements["div"];
const __VLS_16 = __VLS_elementAsFunctionalComponent(__VLS_15);
const __VLS_17 = __VLS_16({ ...{}, class: ("row"), }, ...__VLS_functionalComponentArgsRest(__VLS_16));
({} as (props: __VLS_FunctionalComponentProps<typeof __VLS_15, typeof __VLS_17> & Record<string, unknown>) => void)({ ...{}, class: ("row"), });
const __VLS_18 = __VLS_pickFunctionalComponentCtx(__VLS_15, __VLS_17)!;
let __VLS_19!: __VLS_NormalizeEmits<typeof __VLS_18.emit>;
{
const __VLS_20 = ({} as 'HorizontalBarChart' extends keyof typeof __VLS_ctx ? { 'HorizontalBarChart': typeof __VLS_ctx.HorizontalBarChart; } : typeof __VLS_resolvedLocalAndGlobalComponents).HorizontalBarChart;
const __VLS_21 = __VLS_asFunctionalComponent(__VLS_20, new __VLS_20({ ...{}, class: ("horizontal-bar-chart"), barChartDataKey: ("pGetKDA"), }));
({} as { HorizontalBarChart: typeof __VLS_20; }).HorizontalBarChart;
const __VLS_22 = __VLS_21({ ...{}, class: ("horizontal-bar-chart"), barChartDataKey: ("pGetKDA"), }, ...__VLS_functionalComponentArgsRest(__VLS_21));
({} as (props: __VLS_FunctionalComponentProps<typeof __VLS_20, typeof __VLS_22> & Record<string, unknown>) => void)({ ...{}, class: ("horizontal-bar-chart"), barChartDataKey: ("pGetKDA"), });
const __VLS_23 = __VLS_pickFunctionalComponentCtx(__VLS_20, __VLS_22)!;
let __VLS_24!: __VLS_NormalizeEmits<typeof __VLS_23.emit>;
}
{
const __VLS_25 = __VLS_intrinsicElements["div"];
const __VLS_26 = __VLS_elementAsFunctionalComponent(__VLS_25);
const __VLS_27 = __VLS_26({ ...{}, class: ("column side big"), }, ...__VLS_functionalComponentArgsRest(__VLS_26));
({} as (props: __VLS_FunctionalComponentProps<typeof __VLS_25, typeof __VLS_27> & Record<string, unknown>) => void)({ ...{}, class: ("column side big"), });
const __VLS_28 = __VLS_pickFunctionalComponentCtx(__VLS_25, __VLS_27)!;
let __VLS_29!: __VLS_NormalizeEmits<typeof __VLS_28.emit>;
{
const __VLS_30 = __VLS_intrinsicElements["h1"];
const __VLS_31 = __VLS_elementAsFunctionalComponent(__VLS_30);
const __VLS_32 = __VLS_31({ ...{}, }, ...__VLS_functionalComponentArgsRest(__VLS_31));
({} as (props: __VLS_FunctionalComponentProps<typeof __VLS_30, typeof __VLS_32> & Record<string, unknown>) => void)({ ...{}, });
const __VLS_33 = __VLS_pickFunctionalComponentCtx(__VLS_30, __VLS_32)!;
let __VLS_34!: __VLS_NormalizeEmits<typeof __VLS_33.emit>;
(__VLS_33.slots!).default;
}
{
const __VLS_35 = __VLS_intrinsicElements["h1"];
const __VLS_36 = __VLS_elementAsFunctionalComponent(__VLS_35);
const __VLS_37 = __VLS_36({ ...{}, style: ({}), }, ...__VLS_functionalComponentArgsRest(__VLS_36));
({} as (props: __VLS_FunctionalComponentProps<typeof __VLS_35, typeof __VLS_37> & Record<string, unknown>) => void)({ ...{}, style: ({}), });
const __VLS_38 = __VLS_pickFunctionalComponentCtx(__VLS_35, __VLS_37)!;
let __VLS_39!: __VLS_NormalizeEmits<typeof __VLS_38.emit>;
(__VLS_ctx.playerData.pShotAcc);
(__VLS_38.slots!).default;
}
(__VLS_28.slots!).default;
}
(__VLS_18.slots!).default;
}
{
const __VLS_40 = __VLS_intrinsicElements["h1"];
const __VLS_41 = __VLS_elementAsFunctionalComponent(__VLS_40);
const __VLS_42 = __VLS_41({ ...{}, }, ...__VLS_functionalComponentArgsRest(__VLS_41));
({} as (props: __VLS_FunctionalComponentProps<typeof __VLS_40, typeof __VLS_42> & Record<string, unknown>) => void)({ ...{}, });
const __VLS_43 = __VLS_pickFunctionalComponentCtx(__VLS_40, __VLS_42)!;
let __VLS_44!: __VLS_NormalizeEmits<typeof __VLS_43.emit>;
(__VLS_43.slots!).default;
}
{
const __VLS_45 = __VLS_intrinsicElements["div"];
const __VLS_46 = __VLS_elementAsFunctionalComponent(__VLS_45);
const __VLS_47 = __VLS_46({ ...{}, class: ("row"), }, ...__VLS_functionalComponentArgsRest(__VLS_46));
({} as (props: __VLS_FunctionalComponentProps<typeof __VLS_45, typeof __VLS_47> & Record<string, unknown>) => void)({ ...{}, class: ("row"), });
const __VLS_48 = __VLS_pickFunctionalComponentCtx(__VLS_45, __VLS_47)!;
let __VLS_49!: __VLS_NormalizeEmits<typeof __VLS_48.emit>;
{
const __VLS_50 = ({} as 'RadarChartGroup' extends keyof typeof __VLS_ctx ? { 'RadarChartGroup': typeof __VLS_ctx.RadarChartGroup; } : typeof __VLS_resolvedLocalAndGlobalComponents).RadarChartGroup;
const __VLS_51 = __VLS_asFunctionalComponent(__VLS_50, new __VLS_50({ ...{}, }));
({} as { RadarChartGroup: typeof __VLS_50; }).RadarChartGroup;
({} as { RadarChartGroup: typeof __VLS_50; }).RadarChartGroup;
const __VLS_52 = __VLS_51({ ...{}, }, ...__VLS_functionalComponentArgsRest(__VLS_51));
({} as (props: __VLS_FunctionalComponentProps<typeof __VLS_50, typeof __VLS_52> & Record<string, unknown>) => void)({ ...{}, });
const __VLS_53 = __VLS_pickFunctionalComponentCtx(__VLS_50, __VLS_52)!;
let __VLS_54!: __VLS_NormalizeEmits<typeof __VLS_53.emit>;
}
(__VLS_48.slots!).default;
}
{
const __VLS_55 = __VLS_intrinsicElements["div"];
const __VLS_56 = __VLS_elementAsFunctionalComponent(__VLS_55);
const __VLS_57 = __VLS_56({ ...{}, class: ("row"), }, ...__VLS_functionalComponentArgsRest(__VLS_56));
({} as (props: __VLS_FunctionalComponentProps<typeof __VLS_55, typeof __VLS_57> & Record<string, unknown>) => void)({ ...{}, class: ("row"), });
const __VLS_58 = __VLS_pickFunctionalComponentCtx(__VLS_55, __VLS_57)!;
let __VLS_59!: __VLS_NormalizeEmits<typeof __VLS_58.emit>;
{
const __VLS_60 = ({} as 'DoughnutChart' extends keyof typeof __VLS_ctx ? { 'DoughnutChart': typeof __VLS_ctx.DoughnutChart; } : typeof __VLS_resolvedLocalAndGlobalComponents).DoughnutChart;
const __VLS_61 = __VLS_asFunctionalComponent(__VLS_60, new __VLS_60({ ...{}, donutChartDataKey: ("pGetGameModes"), }));
({} as { DoughnutChart: typeof __VLS_60; }).DoughnutChart;
({} as { DoughnutChart: typeof __VLS_60; }).DoughnutChart;
const __VLS_62 = __VLS_61({ ...{}, donutChartDataKey: ("pGetGameModes"), }, ...__VLS_functionalComponentArgsRest(__VLS_61));
({} as (props: __VLS_FunctionalComponentProps<typeof __VLS_60, typeof __VLS_62> & Record<string, unknown>) => void)({ ...{}, donutChartDataKey: ("pGetGameModes"), });
const __VLS_63 = __VLS_pickFunctionalComponentCtx(__VLS_60, __VLS_62)!;
let __VLS_64!: __VLS_NormalizeEmits<typeof __VLS_63.emit>;
}
{
const __VLS_65 = ({} as 'DoughnutChart' extends keyof typeof __VLS_ctx ? { 'DoughnutChart': typeof __VLS_ctx.DoughnutChart; } : typeof __VLS_resolvedLocalAndGlobalComponents).DoughnutChart;
const __VLS_66 = __VLS_asFunctionalComponent(__VLS_65, new __VLS_65({ ...{}, donutChartDataKey: ("pGetGameModes"), }));
({} as { DoughnutChart: typeof __VLS_65; }).DoughnutChart;
({} as { DoughnutChart: typeof __VLS_65; }).DoughnutChart;
const __VLS_67 = __VLS_66({ ...{}, donutChartDataKey: ("pGetGameModes"), }, ...__VLS_functionalComponentArgsRest(__VLS_66));
({} as (props: __VLS_FunctionalComponentProps<typeof __VLS_65, typeof __VLS_67> & Record<string, unknown>) => void)({ ...{}, donutChartDataKey: ("pGetGameModes"), });
const __VLS_68 = __VLS_pickFunctionalComponentCtx(__VLS_65, __VLS_67)!;
let __VLS_69!: __VLS_NormalizeEmits<typeof __VLS_68.emit>;
}
(__VLS_58.slots!).default;
}
{
const __VLS_70 = __VLS_intrinsicElements["div"];
const __VLS_71 = __VLS_elementAsFunctionalComponent(__VLS_70);
const __VLS_72 = __VLS_71({ ...{}, class: ("background-image"), }, ...__VLS_functionalComponentArgsRest(__VLS_71));
({} as (props: __VLS_FunctionalComponentProps<typeof __VLS_70, typeof __VLS_72> & Record<string, unknown>) => void)({ ...{}, class: ("background-image"), });
const __VLS_73 = __VLS_pickFunctionalComponentCtx(__VLS_70, __VLS_72)!;
let __VLS_74!: __VLS_NormalizeEmits<typeof __VLS_73.emit>;
{
const __VLS_75 = ({} as 'ScatterChart' extends keyof typeof __VLS_ctx ? { 'ScatterChart': typeof __VLS_ctx.ScatterChart; } : typeof __VLS_resolvedLocalAndGlobalComponents).ScatterChart;
const __VLS_76 = __VLS_asFunctionalComponent(__VLS_75, new __VLS_75({ ...{}, }));
({} as { ScatterChart: typeof __VLS_75; }).ScatterChart;
({} as { ScatterChart: typeof __VLS_75; }).ScatterChart;
const __VLS_77 = __VLS_76({ ...{}, }, ...__VLS_functionalComponentArgsRest(__VLS_76));
({} as (props: __VLS_FunctionalComponentProps<typeof __VLS_75, typeof __VLS_77> & Record<string, unknown>) => void)({ ...{}, });
const __VLS_78 = __VLS_pickFunctionalComponentCtx(__VLS_75, __VLS_77)!;
let __VLS_79!: __VLS_NormalizeEmits<typeof __VLS_78.emit>;
}
(__VLS_73.slots!).default;
}
(__VLS_3.slots!).default;
}
if (typeof __VLS_styleScopedClasses === 'object' && !Array.isArray(__VLS_styleScopedClasses)) {
__VLS_styleScopedClasses["chart-info"];
__VLS_styleScopedClasses["column"];
__VLS_styleScopedClasses["side"];
__VLS_styleScopedClasses["row"];
__VLS_styleScopedClasses["horizontal-bar-chart"];
__VLS_styleScopedClasses["column"];
__VLS_styleScopedClasses["side"];
__VLS_styleScopedClasses["big"];
__VLS_styleScopedClasses["row"];
__VLS_styleScopedClasses["row"];
__VLS_styleScopedClasses["background-image"];
}
var __VLS_slots!: {};
// @ts-ignore
[playerData,];
return __VLS_slots;
}
